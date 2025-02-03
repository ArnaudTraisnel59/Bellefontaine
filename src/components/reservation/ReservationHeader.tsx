import { motion } from "framer-motion";

export const ReservationHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <h1 className="text-4xl font-bold mb-6">Réservez Votre Session de Pilotage</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Découvrez nos circuits exceptionnels et vivez une expérience unique sur deux roues. 
        Que vous soyez débutant ou expert, nos circuits sont adaptés à tous les niveaux.
      </p>
    </motion.div>
  );
};