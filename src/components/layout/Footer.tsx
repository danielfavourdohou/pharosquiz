
import { Link } from 'react-router-dom';
import { Github, Twitter, MessageSquare } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-auto bg-pharosNavy/70 backdrop-blur-sm">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-neonCyan flex items-center justify-center text-pharosNavy font-bold text-lg">
                P
              </div>
              <span className="font-bold text-lg text-white">PharosQuiz</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              A live, Kahoot-style Web3 quiz platform on the Pharos blockchain. Create quizzes, win crypto prizes, and have fun!
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-neonCyan transition-colors">How It Works</Link></li>
              <li><Link to="/create-quiz" className="text-muted-foreground hover:text-neonCyan transition-colors">Create Quiz</Link></li>
              <li><Link to="/join-quiz" className="text-muted-foreground hover:text-neonCyan transition-colors">Join Quiz</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-neonCyan transition-colors">Documentation</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-neonCyan transition-colors">FAQs</Link></li>
              <li><a href="https://www.buildonpharos.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neonCyan transition-colors">Pharos Blockchain</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-neonCyan transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-neonCyan transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-neonCyan transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-neonCyan transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {currentYear} PharosQuiz Nexus. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neonCyan transition-colors">
              <Twitter size={18} />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neonCyan transition-colors">
              <MessageSquare size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neonCyan transition-colors">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
