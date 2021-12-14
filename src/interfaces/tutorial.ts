interface ITutorial {
  title: string
  description: string
  published: boolean
}

interface ITutorialResult extends ITutorial {
  id: number
}

interface ITutorialResultWithCount {
  data: ITutorialResult[]
  count: number
}

export { ITutorial, ITutorialResult, ITutorialResultWithCount }
