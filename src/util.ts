import { Area } from './types';

export const getAreaString = (area: Area) => {
  return {
    [Area.FRONTEND]: 'Frontend',
    [Area.BACKEND]: 'Backend',
    [Area.INFRA]: 'Design',
    [Area.DATABASE]: 'Database',
  }[area];
}

export const URLs = {
  users: "http://localhost:3333/users",
  userData: "http://localhost:3333/userData",
  userPlugins: "http://localhost:3333/userPlugins",
  teamPlugins: "http://localhost:3333/teamPlugins",
  tickets: "http://localhost:3333/tickets",
}

export const queryKeys = {
  users: "users",
  userData: "userData",
}