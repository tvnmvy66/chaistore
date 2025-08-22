import { motion } from "framer-motion"
import { Instagram, Twitter, Youtube, Github, Leaf} from "lucide-react"


const socials = [
  { name: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { name: "Twitter/X", href: "https://twitter.com", Icon: Twitter },
  { name: "YouTube", href: "https://youtube.com", Icon: Youtube },
  { name: "GitHub", href: "https://github.com", Icon: Github },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t pb-6 mt-11 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex flex-col xl:flex-row items-center justify-between py-6 gap-4">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border"
              aria-hidden
            >
              <Leaf className="h-5 w-5" />
            </motion.div>
            <div className="leading-tight">
              <p className="font-semibold text-lg">Chai Co.</p>
              <p className="text-sm">Small sips. Big vibes.</p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ name, href, Icon }) => (
              <motion.a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className=""
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                aria-label={name}
              >
                <Icon className="h-5 w-5 mr-2" />
              </motion.a>
            ))}
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <div className="opacity-80">© {year} Chai Co. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/sitemap.xml" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
