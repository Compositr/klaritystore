export default function H1({ children }: React.PropsWithChildren) {
  return (
    <h1 className="scroll-m-20 font-serif text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}
