
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { toast } from '@/components/ui/sonner';
import { Wallet, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const WalletConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const connectMetaMask = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed. Please install it to continue.");
      return;
    }

    try {
      setIsConnecting(true);
      
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      
      // Sign a message to verify ownership
      const message = `Sign this message to authenticate with PharosQuiz: ${new Date().toISOString()}`;
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });

      if (user) {
        // Update existing user with wallet address
        const { error } = await supabase.auth.updateUser({
          data: { wallet_address: address }
        });

        if (error) {
          toast.error("Failed to update user with wallet address");
          return;
        }
      } else {
        // For non-logged-in users, create a new account with just the wallet
        // In a full implementation, this would involve a more complex flow
        toast.error("Please log in before connecting your wallet");
        navigate('/login');
        return;
      }

      toast.success('Wallet connected successfully!');
      navigate('/');
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      toast.error(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectPhantom = async () => {
    if (!window.solana) {
      toast.error("Phantom wallet is not installed. Please install it to continue.");
      return;
    }

    try {
      setIsConnecting(true);
      
      // Connect to Phantom
      const resp = await window.solana.connect();
      const address = resp.publicKey.toString();
      
      if (user) {
        // Update existing user with wallet address
        const { error } = await supabase.auth.updateUser({
          data: { wallet_address: address }
        });

        if (error) {
          toast.error("Failed to update user with wallet address");
          return;
        }
      } else {
        // For non-logged-in users, create a new account with just the wallet
        toast.error("Please log in before connecting your wallet");
        navigate('/login');
        return;
      }

      toast.success('Wallet connected successfully!');
      navigate('/');
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      toast.error(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md border border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold gradient-text">
              Connect Your Wallet
            </CardTitle>
            <CardDescription>
              Connect your blockchain wallet to participate in quizzes and earn crypto rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={connectMetaMask} 
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white" 
              disabled={isConnecting}
            >
              {isConnecting ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              ) : (
                <Wallet className="h-5 w-5" />
              )}
              <span>Connect MetaMask</span>
            </Button>
            
            <Button 
              onClick={connectPhantom} 
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white" 
              disabled={isConnecting}
            >
              {isConnecting ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              ) : (
                <Wallet className="h-5 w-5" />
              )}
              <span>Connect Phantom</span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-primary/20"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center text-sm">
            <p className="text-muted-foreground text-center">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default WalletConnect;
