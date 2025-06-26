import AIRCard from "views/clients/quoteCard/AIRCard";
import FCLCard from "views/clients/quoteCard/FCLCard";
import LCLCard from "views/clients/quoteCard/LCLCard";

const getCard = ({ quote, index, min, to }) => {
    switch(quote.shipmentType) {
        case "fcl":
            return <FCLCard
                quote={ quote }
                index= { index }

                to={ to }
                min={ min }
            />

        case "lcl":
            return <LCLCard
                quote={ quote }
                index= { index }

                to={ to }
                min={ min }
            />

        case "air":
            return <AIRCard
                quote={ quote }
                index= { index }

                to={ to }
                min={ min }
            />
    }
}

export default getCard;