import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { User, Check, Loader2 } from 'lucide-react';

interface UserProfile {
  id: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  wallet_address?: string;
}

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        setProfile(data);
        setDisplayName(data.display_name || '');
        setUsername(data.username || '');
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast("Failed to load profile", {
          description: "Please try refreshing the page."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [user, navigate]);
  
  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName,
          username: username
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast("Profile updated successfully!", {
        description: "Your changes have been saved.",
        icon: <Check className="h-4 w-4" />
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast("Failed to update profile", {
        description: "Please try again."
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const getInitials = (name?: string): string => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-neonCyan" />
            <p className="text-lg">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and how others see you on PharosQuiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Avatar */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback className="bg-neonCyan text-pharosNavy text-xl">
                    {getInitials(profile?.display_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-medium">Profile Picture</h4>
                  <p className="text-sm text-muted-foreground">
                    Profile picture upload feature coming soon...
                  </p>
                </div>
              </div>
              
              {/* Profile Fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium mb-1">
                    Display Name
                  </label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This is the name displayed to other users.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your unique username on PharosQuiz. Used for mentions and profile links.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your email address cannot be changed.
                  </p>
                </div>
                
                {profile?.wallet_address && (
                  <div>
                    <label htmlFor="wallet" className="block text-sm font-medium mb-1">
                      Connected Wallet
                    </label>
                    <Input
                      id="wallet"
                      value={`${profile.wallet_address.substring(0, 6)}...${profile.wallet_address.substring(profile.wallet_address.length - 4)}`}
                      disabled
                      className="w-full bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      <a href="/wallet-connect" className="text-neonCyan hover:underline">Connect a different wallet</a>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="bg-neonCyan text-pharosNavy hover:bg-electricPurple hover:text-white"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
