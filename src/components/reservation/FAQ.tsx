import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => (
  <div className="mt-16">
    <h2 className="text-2xl font-bold mb-8">Questions Fréquentes</h2>
    <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-6">
          Quel équipement est nécessaire ?
        </AccordionTrigger>
        <AccordionContent className="px-6">
          Pour votre sécurité, vous devez porter : un casque homologué, des gants, des bottes de moto, 
          et une tenue adaptée (pantalon et maillot de cross). Location d'équipement possible sur place.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="px-6">
          Puis-je annuler ma réservation ?
        </AccordionTrigger>
        <AccordionContent className="px-6">
          Les annulations sont possibles jusqu'à 48h avant la session. 
          Contactez-nous par téléphone ou email pour toute modification.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="px-6">
          Quel est le niveau requis ?
        </AccordionTrigger>
        <AccordionContent className="px-6">
          Le circuit motocross est accessible à tous les niveaux, avec des zones adaptées aux débutants. 
          Le circuit supercross est recommandé pour les pilotes expérimentés.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="px-6">
          Y a-t-il des motos en location ?
        </AccordionTrigger>
        <AccordionContent className="px-6">
          Oui, nous proposons des motos en location (50€ supplémentaires). 
          Réservation obligatoire à l'avance. Plusieurs cylindrées disponibles.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);