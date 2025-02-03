const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Circuit de Bellefontaine</h3>
            <p className="text-gray-300">
              Les meilleurs circuits de motocross et supercross de la région.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <p className="text-gray-300">Email: contact@bellefontaine-circuit.fr</p>
            <p className="text-gray-300">Tél: 01 23 45 67 89</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Horaires</h4>
            <p className="text-gray-300">Tous les jours</p>
            <p className="text-gray-300">14h - 18h</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; 2024 Circuit de Bellefontaine. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;