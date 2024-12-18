export interface RouteOptions {
    value: string | null,
    label: string | null
}

export interface DirectionOptions {
    value: string | null,
    label: string
}

export interface StopOptions {
    value: string | null,
    label: string
}

export interface AppState {
  routeOptions: RouteOptions[];
  directionOptions: DirectionOptions[];
  stopOptions: StopOptions[];
  selectedRoute: string | null;
  selectedDirection: string | null;
  selectedStop: string | null;
  error: string | null;
}

export interface DropState {
    label: string | null;
}

export interface DepartureData {
    route: string;
    destination: string;
    departs: string;
}

export interface ModalState {
    stopId: string | null;
    departureData: DepartureData[];
}