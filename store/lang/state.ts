export interface LangState {
  locales: string[]
  locale: string
}

export default (): LangState => ({
  locales: ['en', 'br'],
  locale: 'en'
})
