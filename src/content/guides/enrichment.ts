export const enrichment: Record<
  string,
  { answer: string; section: { id: string; title: string; paragraphs: string[]; list?: string[] } }
> = {
  'choisir-climatiseur-location': {
    answer:
      'Pour louer un climatiseur, commencez par décrire votre pièce, sa période d’usage et l’ouverture disponible pour rejeter la chaleur. À Perpignan, une demande permet d’étudier le projet ; le modèle, le prix, la durée et la disponibilité restent à confirmer dans le devis.',
    section: {
      id: 'location-une-semaine',
      title: 'Peut-on louer un climatiseur pour une semaine ?',
      paragraphs: [
        'Une semaine peut être indiquée comme durée souhaitée dans votre demande. Cela ne signifie pas qu’une offre hebdomadaire ou une durée minimale est déjà commercialisée : les conditions dépendent de la proposition qui vous sera faite. Mentionnez les dates de début et de fin, ainsi que leur éventuelle souplesse.',
        'Comparez le périmètre total du devis, et pas uniquement une unité de prix. Les accessoires nécessaires, la mise en place éventuelle, les accès et la restitution peuvent modifier l’organisation. Demandez une confirmation écrite des éléments compris avant de donner votre accord.',
      ],
    },
  },
  'puissance-climatisation-surface': {
    answer:
      'Pour une pièce de 30 m², aucun nombre de watts ne peut être garanti sans connaître le volume, l’isolation, l’exposition, les vitrages et l’occupation. La puissance frigorifique doit être étudiée avec les contraintes d’évacuation et les données du fabricant.',
    section: {
      id: 'piece-trente-metres',
      title: 'Comment décrire une pièce de 30 m² ?',
      paragraphs: [
        'Avec une hauteur de 2,5 mètres, 30 m² représentent un volume de 75 m³. Ce calcul géométrique ne donne pas la puissance nécessaire : il précise seulement le volume associé à l’hypothèse de hauteur. Mesurez la hauteur réelle plutôt que de reprendre cette valeur par défaut.',
        'Ajoutez une description des vitrages et de leur orientation, des stores ou volets, de la toiture éventuelle et du nombre d’occupants. Signalez les ouvertures fréquentes et les équipements produisant de la chaleur. La température visée doit rester cohérente avec les conditions du lieu et le matériel disponible.',
      ],
      list: [
        'Surface mesurée : longueur × largeur.',
        'Volume : surface × hauteur réelle.',
        'Apports : soleil, personnes, équipements.',
        'Contraintes : rejet de chaleur, accès, bruit.',
      ],
    },
  },
  'evacuation-air-chaud': {
    answer:
      'Oui, un climatiseur mobile monobloc doit rejeter la chaleur à l’extérieur à l’aide de sa gaine. La fenêtre, le calfeutrage, la longueur et le diamètre du conduit doivent être compatibles avec la notice. Rejeter dans une pièce fermée ne remplace pas cette évacuation.',
    section: {
      id: 'verification-avant-marche',
      title: 'Les vérifications avant la mise en marche',
      paragraphs: [
        'Contrôlez la fixation des raccords, le dégagement des grilles et le trajet de la gaine. Le rejet extérieur ne doit pas être obstrué et les accessoires ne doivent pas gêner le passage. Vérifiez aussi le mode de gestion des condensats propre à l’appareil.',
        'Si la fenêtre ne ferme plus correctement autour du dispositif ou si l’implantation impose une rallonge de gaine non autorisée, interrompez la préparation et faites préciser une solution compatible. Une adaptation improvisée peut annuler l’intérêt du refroidissement ou dégrader le fonctionnement.',
      ],
    },
  },
  'climatiseur-mobile-ou-ventilateur': {
    answer:
      'Un ventilateur met l’air en mouvement, sans retirer la chaleur de la pièce. Un climatiseur utilise un cycle frigorifique et rejette cette chaleur à l’extérieur. Le choix dépend du résultat recherché et des possibilités d’installation, pas seulement du format de l’appareil.',
    section: {
      id: 'rafraichisseur-evaporatif',
      title: 'Et un rafraîchisseur évaporatif ?',
      paragraphs: [
        'Un appareil à évaporation utilise de l’eau et un flux d’air ; il ne fonctionne pas comme un climatiseur à cycle frigorifique. Ses contraintes d’usage et son effet sur l’humidité doivent être vérifiés dans sa documentation. La présence d’un réservoir d’eau n’est donc pas un signe suffisant pour identifier une climatisation.',
        'Pour comparer des solutions, demandez d’abord quelle technologie est utilisée, quel effet est attendu dans le local et quelles conditions sont nécessaires. Les termes « rafraîchissement » et « climatisation » ne permettent pas, à eux seuls, de conclure qu’un appareil retirera la chaleur de la pièce.',
      ],
    },
  },
  'consommation-climatiseur-mobile': {
    answer:
      'L’énergie consommée se calcule en multipliant la puissance électrique absorbée en kilowatts par la durée en heures, sous l’hypothèse d’une puissance constante. La puissance frigorifique est une autre donnée. Le coût dépend ensuite du tarif réel de votre contrat électrique.',
    section: {
      id: 'calcul-pedagogique',
      title: 'Un calcul transparent, avec ses limites',
      paragraphs: [
        'Sous l’hypothèse purement pédagogique d’une absorption constante de 1 kW pendant 6 heures, l’énergie serait de 6 kWh. Ce calcul ne décrit aucun équipement proposé à la location. Si le compresseur s’arrête, module ou redémarre, la consommation réelle dépendra du profil effectif de fonctionnement.',
        'Pour estimer une dépense, multipliez les kWh par le prix applicable dans votre propre contrat. Séparez les périodes tarifaires si nécessaire. Un appareil de mesure compatible avec l’installation peut renseigner l’énergie réellement utilisée ; ses conditions et limites d’usage doivent être respectées.',
      ],
    },
  },
  'climatisation-temporaire-bureau-commerce': {
    answer:
      'Pour un bureau ou un commerce, décrivez les zones occupées, les horaires, les personnes présentes, les vitrages et les équipements chauffants. Ajoutez les possibilités de rejet extérieur, l’alimentation et les circulations à préserver avant de demander une solution temporaire.',
    section: {
      id: 'fiche-besoin-pro',
      title: 'Une fiche de besoin pour faciliter l’étude',
      paragraphs: [
        'Rassemblez les informations par zone et non seulement par bâtiment. Un plan simple avec les ouvertures, les postes occupés et les contraintes de passage permet d’éviter des hypothèses contradictoires. Pour un local ouvert au public, signalez les conditions d’accès et les règles internes applicables.',
        'Définissez les heures durant lesquelles la préparation, l’utilisation et la restitution sont envisageables. Si plusieurs interlocuteurs gèrent le bâtiment et l’activité, identifiez qui peut autoriser les adaptations. Le devis doit préciser les prestations réellement retenues ; aucune mise en place n’est présumée dans une simple demande.',
      ],
    },
  },
};
