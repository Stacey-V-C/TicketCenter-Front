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
  FILTER_AREAS,
  BOLD_TEXT,
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
  state: {
    areas?: Area[],
    boldWords?: string[],
  }
}

export type View = {
  name: string,
  plugins: PluginSummary[],
  latestState: {
    areas?: Area[],
    boldWords?: string[],
  },
  tickets: Ticket[],
}