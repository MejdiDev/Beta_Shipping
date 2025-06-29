import QuoteList from "components/QuoteList";
import { getQuotes } from "services/ApiAdmin";

const AdminQuoteList = () => {
    return (
        <>
            <QuoteList
                getQuotes={ getQuotes }
                editable={true}
            />
        </>
    );
}

export default AdminQuoteList;