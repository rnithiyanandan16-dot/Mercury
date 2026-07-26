@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-[#0B0B0B] text-[#E8EDF5] font-sans antialiased;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #141a21;
  }
  ::-webkit-scrollbar-thumb {
    background: #2a313c;
    border-radius: 12px;
  }
}
