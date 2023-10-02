export enum Area {
  BACKEND,
  FRONTEND,
  DATABASE,
  INFRA,
}

export type Ticket = {
  id: number,
  area: Area,
  content: string,
}

export enum PluginType {
  BOLD_TEXT,
  FILTER_AREAS,
}

export type Plugin =
  | {
    readonly type: PluginType.BOLD_TEXT,
    readonly word: string,
  }
  | {
    readonly type: PluginType.FILTER_AREAS,
    readonly keptAreas: Area[],
  }

  export type PluginSummary = {
    plugin: Plugin,
    summary: {
      keptAreas?: Area[],
      boldedWords?: string[],
    }
  }

export type View = {
  name: string,
  plugins: PluginSummary[],
  tickets: Ticket[],
}