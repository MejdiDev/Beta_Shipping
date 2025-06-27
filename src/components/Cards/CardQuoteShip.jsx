import AIRCard from "views/clients/quoteCard/AIRCard";
import FCLCard from "views/clients/quoteCard/FCLCard";
import LCLCard from "views/clients/quoteCard/LCLCard";

const getCard = ({ quote, index, min, to, model }) => {
    switch(quote.shipmentType) {
        case "fcl":
            return <FCLCard
                model={model}

                quote={ quote }
                index= { index }

                to={ to }
                min={ min }
            />

        case "lcl":
            return <LCLCard
                model={model}

                quote={ quote }
                index= { index }

                to={ to }
                min={ min }
            />

        case "air":
            return <AIRCard
                model={model}

                quote={ quote }
                index= { index }

                to={ to }
                min={ min }
            />
    }
}

export default getCard;