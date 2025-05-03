
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-pharos-primary flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <span className="font-bold text-lg">PharosQuiz</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              A live, Kahoot-style Web3 quiz platform on the Pharos blockchain. Create quizzes, win crypto prizes, and have fun!
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">How It Works</Link></li>
              <li><Link to="/create-quiz" className="text-muted-foreground hover:text-foreground">Create Quiz</Link></li>
              <li><Link to="/join-quiz" className="text-muted-foreground hover:text-foreground">Join Quiz</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/docs" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQs</Link></li>
              <li><a href="https://pharos.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Pharos Blockchain</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} PharosQuiz Nexus. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Discord</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
