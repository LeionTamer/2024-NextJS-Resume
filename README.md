## Getting Started

Install the nextjs app with preferred settings

```bash
npx create-next-app@latest
```

Install Openai package and tanstack query
Tanstack query would be the way we call the server components

```bash
npm install @tanstack/react-query
npm install --save openai
```

We need to wrap our application with a queryClient provider to allow the use of the tanstack queries

<details>
<summary>create a new file `app/components/providers.tsx`</summary>

```typescript
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient()

type IProvidersProps = {
  children: ReactNode
}

function Providers({ children }: IProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Providers
```

</details>

<br />

In the app layout, wrap the body of the application

<details>
<summary>
Changes in the `app/layout.tsx`
</summary>

```typescript
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
```

</details>

<br />

## Optional DX libraries

### prettier-eslint package and configuration

Install the prettier-eslint package and add the configuration file to format the codes

```bash
npm install --save-dev prettier-eslint
```

Add the configuration file for prettier

<details>
<summary>
Create a `.prettierrc` file</summary>

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

</details>

<br/>

### ShadCDN UI library

Install ShadCDN to make use of the component library

```bash
npx shadcn-ui@latest init
```

Add the components to be used in the application.
You can opt to install the other components later

```
npx shadcn-ui@latest add button card input textarea select
```

<br />

### Tailwindcss extension for prettier

Install the tailwind-prettier extension to sort your tailwind classes

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

Update the `.prettierrc` file with the addition of

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### App Layout with fixed header and footer

To have a fixed header and footer, we use the grid-row-templates and have the body section take up 1 whole frame.

```html
<div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
  <div className="bg-slate-500">headers go here</div>
  <div>{children}</div>
  <div className="bg-slate-500">footers go here</div>
</div>
```

### Add Markdown support with react-markdown

Install the package

```bash
npm install react-markdown
```

Import the component

```typescript
import ReactMarkdown from 'react-markdown'
```
