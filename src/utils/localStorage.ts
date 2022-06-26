export const getInitialRival = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedRival = window.localStorage.getItem('stored-rival')
    if (typeof storedRival === 'string') {
      return storedRival
    }
  }
  return 'red'
}

export const persistCurrentRival = (rival: string) => {
  localStorage.setItem('stored-rival', rival)
}
