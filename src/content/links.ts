export interface HotbarLink {
  id: number
  title: string
  description: string
  url: string
  icon: string
}

export const links: HotbarLink[] = [
  {
    id: 1,
    title: 'Twitch',
    description: 'Watch me build Keystone live, wander the streets for real philosophy conversations, or dig into deep solo thinking sessions.',
    url: 'https://www.twitch.tv/zachredder',
    icon: '/images/slots/slot-1.png',
  },
  {
    id: 2,
    title: 'YouTube',
    description: 'Highlights and standalone segments pulled from the streams, plus full video essays and vlogs for the stuff that deserves more depth than a live stream allows.',
    url: 'https://www.youtube.com/@zachredder',
    icon: '/images/slots/slot-2.png',
  },
  {
    id: 3,
    title: 'Keystone Family',
    description: 'The community for everyone following along. Pitch your business, share your creativity, argue a hot take, submit a dilemma, or just hang out and talk.',
    url: 'https://discord.me/keystonefamily',
    icon: '/images/slots/slot-3.png',
  },
  {
    id: 4,
    title: 'Keystone',
    description: 'A voice-based improvement app built on Aristotle\'s golden mean framework. You talk and affirm your character, it asks the right questions, and you think it through for yourself.',
    url: 'https://www.thekeystoneapp.com/',
    icon: '/images/slots/slot-4.png',
  },
  {
    id: 5,
    title: 'Instagram',
    description: 'Behind-the-scenes moments from streams, builds, and daily life, a more personal look at what\'s going on in between everything else.',
    url: 'https://www.instagram.com/zachredder',
    icon: '/images/slots/slot-5.png',
  },
  {
    id: 6,
    title: 'Tiktok',
    description: 'Short-form videos, some pulled from stream clips and some recorded on their own, covering philosophy, business, etc.',
    url: 'https://www.tiktok.com/@zachredder',
    icon: '/images/slots/slot-6.png',
  },
  {
    id: 7,
    title: 'X',
    description: 'Daily thoughts on philosophy and business, along with real-time updates on whatever\'s actually happening behind the scenes.',
    url: 'https://x.com/zach_redder',
    icon: '/images/slots/slot-7.png',
  },
  {
    id: 8,
    title: 'Github',
    description: 'The actual code behind Keystone and everything else I make, out in the open for anyone who wants to look under the hood and make contributions on some projects.',
    url: 'https://github.com/zach-redder',
    icon: '/images/slots/slot-8.png',
  },
  {
    id: 9,
    title: 'Redder Media',
    description: 'My dev agency for software and web projects. See how I build by watching the process, then reach out if you want something built.',
    url: 'https://www.reddermedia.com/',
    icon: '/images/slots/slot-9.png',
  },
]
