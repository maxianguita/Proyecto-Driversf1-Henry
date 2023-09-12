
const initialState = {
    drivers: [],
    allDrivers: [],
    currentPage: 1,
    teams: [],
    filterTeams: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_DRIVERS":
            // Aca Obtengo la lista de todos los conductores y la almacena en el estado.
            return {
                ...state,
                allDrivers: action.payload
            }
        case "FILTER_BY_DOB":
             // Aca filtro  y ordeno los conductores por fecha de nacimiento.
            // Dependiendo de `action.payload`, puede ser de más joven a más viejo o viceversa.

            const currentDrivers = state.filterTeams.length ? [...state.filterTeams] : [...state.allDrivers]
            const compareByDobA = (driver1, driver2) => { // más viejo
                const date1 = new Date(driver1.dob);
                const date2 = new Date(driver2.dob);
                return date2 - date1;
            };
            const compareByDobD = (driver1, driver2) => {   //de  a más jovem
                const date1 = new Date(driver1.dob);
                const date2 = new Date(driver2.dob);
                return date1 - date2;
            };
            const dobFiltered = action.payload === 'ascDob' ? currentDrivers.sort(compareByDobA) : currentDrivers.sort(compareByDobD)
            return {
                ...state,
                drivers: dobFiltered
            }
        case "FILTER_BY_NAME":
            // Filtro y ordeno los conductores por nombre (ascendente o descendente).

            const todosName = state.filterTeams.length ? [...state.filterTeams] : [...state.allDrivers]
            let driversOrdenadosName = action.payload === "asc" ?
                todosName.sort(function (a, b) {
                    if (a.forename > b.forename) {
                        return 1
                    }
                    if (a.forename < b.forename) {
                        return -1
                    }
                    return 0
                })
                :
                todosName.sort(function (a, b) {
                    if (a.forename > b.forename) {
                        return -1
                    }
                    if (a.forename < b.forename) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                drivers: action.payload === "All" ? state.filterTeams : driversOrdenadosName
            }
        case "POST_DRIVER":
            return {
                ...state,
            }
        case "GET_TEAMS":
            return {
                ...state,
                teams: action.payload
            }
        case "FILTER_CREATED":
            const createdFilterWithTeam = action.payload === "created" ? state.filterTeams.filter(element => element.createdInDb) : state.filterTeams.filter(element => !element.createdInDb) 
            const createdFilterWithoutTeam = action.payload === "created" ? state.allDrivers.filter(element => element.createdInDb) : state.allDrivers.filter(element => !element.createdInDb)
            const createdFilter = state.filterTeams.length ? createdFilterWithTeam : createdFilterWithoutTeam
            return {
                ...state,
                drivers: action.payload === "All" ? state.filterTeams : createdFilter,
                filterTeams: !createdFilter.length ? state.allDrivers : [...state.filterTeams]
            }
        case "UPDATE_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.payload
            }
        case "GET_NAME_DRIVERS":
            return {
                ...state,
                drivers: action.payload,
            }
        case "SELECTED_TEAM":
            return {
                ...state,
                drivers: action.payload,
                filterTeams: action.payload
            }
        case "FIRST_CALL":
            return {
                ...state,
                drivers: action.payload
            }
        case "RESTART_FILTER":
            return {
                ...state,
                filterTeams: []
            }
        default: return state;


    }
}


export default rootReducer