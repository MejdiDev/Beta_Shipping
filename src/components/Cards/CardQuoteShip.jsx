import AIRCard from "views/clients/quoteCard/AIRCard";
import FCLCard from "views/clients/quoteCard/FCLCard";
import LCLCard from "views/clients/quoteCard/LCLCard";

const getCard = ({ quote, index}) => {
    switch(quote.mode) {
        case "fcl":
        return <FCLCard
            quote={ quote }
            index= { index }
        />

        case "lcl":
        return <LCLCard
            quote={ quote }
            index= { index }
        />

        case "air":
        return <AIRCard
            quote={ quote }
            index= { index }
        />
    }
}

export default getCard;