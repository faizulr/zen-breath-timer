import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Download, Smartphone, Share } from "lucide-react";
import { Link } from "react-router-dom";

const Install = () => {
  return (
    <>
      <Helmet>
        <title>Install Calm Breath Cycle - Add to Home Screen</title>
        <meta
          name="description"
          content="Install Calm Breath Cycle on your device for quick access to calming breathing exercises anytime."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto w-20 h-20 rounded-2xl zen-gradient zen-glow flex items-center justify-center"
          >
            <Smartphone className="w-10 h-10 text-primary-foreground" />
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-3xl font-light text-foreground">Install Calm Breath Cycle</h1>
            <p className="text-muted-foreground">
              Add to your home screen for a native app experience
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-6 text-left">
            <div className="bg-secondary/50 rounded-xl p-5 space-y-4">
              <h2 className="font-medium text-foreground flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                iOS (Safari)
              </h2>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-medium">1.</span>
                  Tap the <Share className="w-4 h-4 inline mx-1" /> Share button
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium">2.</span>
                  Scroll down and tap "Add to Home Screen"
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium">3.</span>
                  Tap "Add" to confirm
                </li>
              </ol>
            </div>

            <div className="bg-secondary/50 rounded-xl p-5 space-y-4">
              <h2 className="font-medium text-foreground flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                Android (Chrome)
              </h2>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-medium">1.</span>
                  Tap the menu (⋮) in the top right
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium">2.</span>
                  Tap "Add to Home screen" or "Install app"
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium">3.</span>
                  Tap "Install" to confirm
                </li>
              </ol>
            </div>
          </div>

          {/* Back to app link */}
          <Link
            to="/"
            className="inline-block text-primary hover:text-primary/80 transition-colors"
          >
            ← Back to Calm Breath Cycle
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default Install;
