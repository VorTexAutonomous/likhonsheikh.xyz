[![Bolt Open Source Codebase](./public/social_preview_index.jpg)](https://bolt.new)

> Welcome to the **likhonsheikh** open-source codebase! This repo contains a simple example app using the core components from likhonsheikh.xyz to help you get started building **AI-powered software development tools** powered by **Sandpack**.

### Why Build with likhonsheikh + Sandpack

By building with the likhonsheikh + Sandpack you can create browser-based applications that let users **prompt, run, edit, and deploy** full-stack web apps directly in the browser, without the need for virtual machines. With Sandpack, you can build apps that give AI direct access and full control over a **Node.js server**, **filesystem**, **package manager** and **dev terminal** inside your users browser tab. This powerful combination allows you to create a new class of development tools that support all major JavaScript libraries and Node packages right out of the box, all without remote environments or local installs.

### What’s the Difference Between likhonsheikh (This Repo) and [likhonsheikh.xyz](https://bolt.new)?

- **likhonsheikh.xyz**: This is the **commercial product** from StackBlitz—a hosted, browser-based AI development tool that enables users to prompt, run, edit, and deploy full-stack web applications directly in the browser. Built on top of the [likhonsheikh open-source repo](https://github.com/VorTexAutonomous/likhonsheikh.xyz) and powered by **Sandpack**.

- **likhonsheikh (This Repo)**: This open-source repository provides the core components used to make **likhonsheikh.xyz**. This repo contains the UI interface for likhonsheikh as well as the server components, built using [Remix Run](https://remix.run/). By leveraging this repo and **Sandpack**, you can create your own AI-powered development tools and full-stack applications that run entirely in the browser.

# Get Started Building with likhonsheikh

likhonsheikh combines the capabilities of AI with sandboxed development environments to create a collaborative experience where code can be developed by the assistant and the programmer together. likhonsheikh combines [Sandpack](https://sandpack.codesandbox.io/) with [Claude Sonnet 3.5](https://www.anthropic.com/news/claude-3-5-sonnet) using [Remix](https://remix.run/) and the [AI SDK](https://sdk.vercel.ai/).

### Sandpack

likhonsheikh uses [Sandpack](https://sandpack.codesandbox.io/) to run generated code in the browser. Sandpack provides likhonsheikh with a full-stack sandbox environment. Sandpack runs full-stack applications directly in the browser without the cost and security concerns of cloud hosted AI agents. Sandpack is interactive and editable, and enables likhonsheikh's AI to run code and understand any changes from the user.

The [Sandpack](https://sandpack.codesandbox.io) is free for personal and open source usage.

### Remix App

likhonsheikh is built with [Remix](https://remix.run/) and
deployed using [CloudFlare Pages](https://pages.cloudflare.com/) and
[CloudFlare Workers](https://workers.cloudflare.com/).

### AI SDK Integration

likhonsheikh uses the [AI SDK](https://github.com/vercel/ai) to integrate with AI
models. At this time, likhonsheikh supports using Anthropic's Claude Sonnet 3.5.
You can get an API key from the [Anthropic API Console](https://console.anthropic.com/) to use with likhonsheikh.
Take a look at how [likhonsheikh uses the AI SDK](https://github.com/VorTexAutonomous/likhonsheikh.xyz/tree/main/app/lib/.server/llm)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v20.15.1)
- pnpm (v9.4.0)

## Setup

1. Clone the repository (if you haven't already):

```bash
git clone https://github.com/VorTexAutonomous/likhonsheikh.xyz.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory and add your Anthropic API key:

```
ANTHROPIC_API_KEY=XXX
```

Optionally, you can set the debug level:

```
VITE_LOG_LEVEL=debug
```

**Important**: Never commit your `.env.local` file to version control. It's already included in .gitignore.

## Available Scripts

- `pnpm run dev`: Starts the development server.
- `pnpm run build`: Builds the project.
- `pnpm run start`: Runs the built application locally using Wrangler Pages. This script uses `bindings.sh` to set up necessary bindings so you don't have to duplicate environment variables.
- `pnpm run preview`: Builds the project and then starts it locally, useful for testing the production build. Note, HTTP streaming currently doesn't work as expected with `wrangler pages dev`.
- `pnpm test`: Runs the test suite using Vitest.
- `pnpm run typecheck`: Runs TypeScript type checking.
- `pnpm run typegen`: Generates TypeScript types using Wrangler.
- `pnpm run deploy`: Builds the project and deploys it to Cloudflare Pages.

## Development

To start the development server:

```bash
pnpm run dev
```

This will start the Remix Vite development server.

## Testing

Run the test suite with:

```bash
pnpm test
```

## Deployment

To deploy the application to Cloudflare Pages:

```bash
pnpm run deploy
```

Make sure you have the necessary permissions and Wrangler is correctly configured for your Cloudflare account.
