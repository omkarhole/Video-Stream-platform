# Video Stream Platform-[Voom.com](https://voom-one.vercel.app/)

A modern video calling platform built with Next.js, Stream Video SDK, and Clerk authentication. Create instant meetings, schedule calls, and enjoy high-quality video communication.

## 🌟 Features  

- **Instant Meetings**: Start video calls immediately
- **Scheduled Meetings**: Plan and schedule future meetings
- **Personal Room**: Each user gets a persistent meeting room
- **Meeting Recordings**: Record and playback meetings
- **Screen Sharing**: Share your screen with participants
- **Real-time Chat**: Text messaging during video calls
- **Meeting History**: View and manage past meetings
- **Responsive Design**: Optimized for desktop and mobile
- **Multiple Layouts**: Grid view, speaker view, and more
- **Participant Management**: Invite, mute, and manage attendees

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Video SDK**: Stream Video React SDK
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner
- **State Management**: React Hooks

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18 or later
- npm, yarn, or pnpm
- A Clerk account for authentication
- A Stream account for video functionality

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/omkarhole/Video-Stream-platform.git
cd Video-Stream-platform
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stream Video
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# Application
NEXT_PUBLIC_BASE_URL=localhost:3000
```

### 4. Get API Keys

#### Clerk Setup:
1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy the publishable key and secret key
4. Configure sign-in/sign-up settings

#### Stream Setup:
1. Go to [getstream.io](https://getstream.io) and create an account
2. Create a new app in the dashboard
3. Copy the API key and secret from the dashboard

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── (auth)/                 # Authentication pages
│   │   ├── sign-in/           # Sign in page
│   │   └── sign-up/           # Sign up page
│   ├── (root)/                # Main application routes
│   │   ├── (home)/           # Dashboard home
│   │   ├── meeting/[id]/     # Individual meeting rooms
│   │   ├── personal-room/    # Personal meeting room
│   │   ├── previous/         # Past meetings
│   │   ├── recordings/       # Meeting recordings
│   │   └── upcoming/         # Scheduled meetings
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── CallList.tsx          # Meeting list display
│   ├── EndCallButton.tsx     # End call functionality
│   ├── HomeCard.tsx          # Dashboard cards
│   ├── Loader.tsx            # Loading component
│   ├── MeetingCard.tsx       # Individual meeting card
│   ├── MeetingModal.tsx      # Meeting creation modal
│   ├── MeetingRoom.tsx       # Video call interface
│   ├── MeetingSetup.tsx      # Pre-call setup
│   ├── MeetingTypeList.tsx   # Meeting type selection
│   ├── MobileNav.tsx         # Mobile navigation
│   ├── Navbar.tsx            # Main navigation
│   └── Sidebar.tsx           # Sidebar navigation
├── hooks/
│   ├── useGetCallById.ts     # Hook to fetch specific call
│   └── useGetCalls.ts        # Hook to fetch all calls
├── actions/
│   └── stream.actions.ts     # Server actions for Stream
├── providers/
│   └── StreamClientProvider.tsx  # Stream client context
├── constants/
│   └── index.ts              # App constants
└── lib/
    └── utils.ts              # Utility functions
```

## 🎯 Key Features Explained

### Meeting Types

1. **Instant Meeting**: Click "New Meeting" to start immediately
2. **Schedule Meeting**: Set date, time, and send invites
3. **Join Meeting**: Enter meeting ID to join existing calls
4. **Personal Room**: Your persistent meeting space

### Personal Room Features

- **Unique Meeting ID**: Each user gets a permanent meeting ID (their user ID)
- **Persistent Link**: Your personal meeting link never changes
- **Easy Access**: Start your personal room anytime
- **Invite Others**: Share your personal room link






### Authentication Flow

1. User signs in via Clerk
2. Stream client initializes with user data
3. Token provider generates secure tokens
4. User can create/join meetings

## 📱 Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Home dashboard with meeting options |
| `/upcoming` | View scheduled meetings |
| `/previous` | Meeting history |
| `/recordings` | Meeting recordings |
| `/personal-room` | Your personal meeting space |
| `/meeting/[id]` | Individual meeting room |
| `/sign-in` | Authentication page |
| `/sign-up` | User registration |

## 🎨 UI Components

### Meeting Card
Displays meeting information with actions:
- Meeting title and description
- Date and time
- Join/Start/Play buttons
- Copy link functionality

### Meeting Modal
Handles meeting creation:
- Instant meetings
- Scheduled meetings
- Meeting configuration

### Meeting Room
Main video call interface:
- Video grid/speaker layouts
- Control buttons
- Participant management
- Screen sharing


## 🔐 Security Features

- **Server-side Token Generation**: Secure token creation
- **Protected Routes**: Authentication required for all meeting features
- **Environment Variables**: Sensitive data stored securely
- **User Validation**: Proper user authentication checks

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STREAM_API_KEY=your_production_stream_key
STREAM_SECRET_KEY=your_production_stream_secret
NEXT_PUBLIC_BASE_URL=your-domain.vercel.app
```

### Build Commands

```bash
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📊 Performance Optimization

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Dynamic imports for heavy components
- **Stream Optimization**: Efficient video streaming

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request


## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/omkarhole/Video-Stream-platform/issues)
- **Documentation**: [Stream Video Docs](https://getstream.io/video/docs/)
- **Authentication**: [Clerk Documentation](https://clerk.com/docs)

## 🙏 Acknowledgments

- [Stream](https://getstream.io) for video infrastructure
- [Clerk](https://clerk.com) for authentication
- [Vercel](https://vercel.com) for hosting
- [Shadcn/ui](https://ui.shadcn.com) for UI components

---

**Built with ❤️ by [Omkar Hole](https://github.com/omkarhole)**
