import { LIMIT, PAGE, SEARCH, SORT } from "../db/configs/index.js";

export class Pagination {

    list = (options = {
        page: PAGE,
        limit: LIMIT,
        search: SEARCH,
        sort: SORT,
    }) => {
        let setSearch   = "";
        let setSort     = "";
        let response    = "";

        const { page, limit, search, sort } = options
        // console.log(sort);

        // Check Searching Key & value
        if (search.value != null && search.value != "null" && search.value != "" && search.value != undefined) {
            Array.from(search.column).map(
                (value, index) => {
                    setSearch += index >= 1 ? ` ${search.condition} ${value}` : value;
                }
            )
        }
        response += setSearch ? `${search.withWere ? `where`:''} ${setSearch} ilike '%${search.value}%' ` : ' ';


        // Checking Sort Key & value
        if (sort.value != null && sort.value != "null" && sort.value != "" && sort.value != undefined) {
            sort.column.map(
                (value, index) => {
                    setSort += index >= 1 ? ` , ${value}` : value;
                }
            )
        }

        response += setSort ? ` order by ${setSort} ${sort.value} ` : ` order by id asc`;
        response += limit ? ` limit ${limit} ` : ' ';
        response += page ? ` offset ${(page - 1) * limit} ` : ' ';
        return(response)
    }
}
