const mouvementsData = {
    "musculation": [
        {
            "id": "M1",
            "name": "Squat avec haltères",
            "description": "Exercice complet qui sollicite les quadriceps, fessiers et ischio-jambiers.",
            "difficulty": "intermediate",
            "sets": "3 séries de 12 répétitions",
            "media": {
                "src": "recources/M1.mp4",
                "type": "video"
            },
            "muscles": ["Quadriceps", "Fessiers", "Ischio-jambiers"],
            "instructions": {
                "position_initiale": "Debout, pieds écartés à la largeur des épaules, haltères tenus le long du corps, dos droit, regard vers l'avant.",
                "execution": "1. Fléchir les genoux en poussant les fesses vers l'arrière comme pour s'asseoir sur une chaise\n2. Descendre jusqu'à ce que les cuisses soient parallèles au sol\n3. Maintenir la position 1 seconde\n4. Revenir à la position initiale en poussant sur les talons"
            }
        },
        {
            "id": "M2",
            "name": "Développé couché",
            "description": "Exercice fondamental pour développer les pectoraux, triceps et épaules.",
            "difficulty": "beginner",
            "sets": "4 séries de 10 répétitions",
            "media": {
                "src": "recources/M2.mp4",
                "type": "video"
            },
            "muscles": ["Pectoraux", "Triceps", "Épaules antérieures"],
            "instructions": {
                "position_initiale": "Allongé sur un banc plat, pieds à plat au sol, mains écartées légèrement plus larges que les épaules.",
                "execution": "1. Descendre la barre lentement vers le milieu de la poitrine\n2. Arrêter à environ 3 cm de la poitrine\n3. Pousser la barre vers le haut jusqu'à extension complète des bras\n4. Contracter les pectoraux en haut du mouvement"
            }
        },
        {
            "id": "M3",
            "name": "Tractions prise large",
            "description": "Exercice excellent pour développer la largeur du dos et les biceps.",
            "difficulty": "advanced",
            "sets": "3 séries de 8-12 répétitions",
            "media": {
                "src": "recources/M3.mp4",
                "type": "video"
            },
            "muscles": ["Grand dorsal", "Biceps", "Trapèzes", "Rhomboïdes"],
            "instructions": {
                "position_initiale": "Suspendu à une barre de traction, mains en pronation (paumes vers l'avant), écartées plus larges que les épaules.",
                "execution": "1. Tirer le corps vers le haut en rapprochant la poitrine de la barre\n2. Contracter les dorsaux en haut du mouvement\n3. Redescendre lentement en contrôlant\n4. Arriver à l'extension complète des bras"
            }
        }
    ],
    "pilates": [
        {
            "id": "P1",
            "name": "The Hundred (Les Cent)",
            "description": "Exercice de respiration et d'échauffement qui active les abdominaux profonds.",
            "difficulty": "beginner",
            "sets": "1 série de 100 respirations",
            "media": {
                "src": "recources/P1.png",
                "type": "image"
            },
            "benefits": ["Respiration profonde", "Endurance abdominale", "Stabilité du tronc"],
            "instructions": {
                "position_initiale": "Allongé sur le dos, genoux fléchis à 90 degrés, pieds à plat au sol, bras le long du corps.",
                "execution": "1. Lever les jambes à un angle de 90 degrés\n2. Relever la tête et les épaules du sol\n3. Étendre les bras parallèles au sol\n4. Effectuer 100 petites pulsations avec les bras\n5. Respirer profondément 5 fois à l'inspiration et 5 fois à l'expiration"
            }
        },
        {
            "id": "P2",
            "name": "Roll Up (Enroulement vertébral)",
            "description": "Exercice qui développe la souplesse de la colonne vertébrale et le contrôle abdominal.",
            "difficulty": "intermediate",
            "sets": "3 séries de 8 répétitions",
            "media": {
                "src": "recources/P2.png",
                "type": "image"
            },
            "benefits": ["Souplesse vertébrale", "Contrôle abdominal", "Mobilité articulaire"],
            "instructions": {
                "position_initiale": "Allongé sur le dos, jambes tendues, bras tendus au-dessus de la tête.",
                "execution": "1. Inspirer en levant les bras vers le plafond\n2. Expirer en enroulant la colonne vertébrale vertèbre par vertèbre\n3. Atteindre la position assise en se penchant vers les pieds\n4. Inspirer en position assise\n5. Expirer en revenant lentement à la position initiale"
            }
        },
        {
            "id": "P3",
            "name": "Swan Dive (Le Cygne qui plonge)",
            "description": "Exercice qui renforce les muscles du dos et étire la chaîne musculaire antérieure.",
            "difficulty": "advanced",
            "sets": "3 séries de 10 répétitions",
            "media": {
                "src": "recources/P3.mp4",
                "type": "video"
            },
            "benefits": ["Renforcement du dos", "Étirement des épaules", "Amélioration de la posture"],
            "instructions": {
                "position_initiale": "Allongé sur le ventre, front posé sur le sol, bras le long du corps, paumes vers le sol.",
                "execution": "1. Inspirer en levant la tête et la poitrine du sol\n2. Lever les bras en extension derrière\n3. Effectuer un mouvement de battement avec les bras comme des ailes\n4. Garder les jambes allongées et actives\n5. Expirer en redescendant lentement"
            }
        }
    ],
    "yoga": [
        {
            "id": "Y1",
            "name": "Tadasana (Posture de la Montagne)",
            "description": "Posture fondamentale qui améliore la posture, l'équilibre et la conscience corporelle.",
            "difficulty": "beginner",
            "duration": "30 secondes à 5 minutes",
            "media": {
                "src": "recources/Y1.png",
                "type": "image"
            },
            "benefits": ["Alignement postural", "Équilibre", "Concentration", "Apaisement mental"],
            "instructions": {
                "position_initiale": "Debout, pieds joints ou légèrement écartés, bras le long du corps.",
                "execution": "1. Répartir le poids uniformément sur les deux pieds\n2. Allonger la colonne vertébrale\n3. Baisser les épaules loin des oreilles\n4. Fixer un point devant soi\n5. Respirer profondément"
            }
        },
        {
            "id": "Y2",
            "name": "Downward Dog pose (Adho Mukha Svanasana)",
            "description": "Posture revitalisante qui étire tout le corps, calme l'esprit et renforce les bras.",
            "difficulty": "intermediate",
            "duration": "1 à 3 minutes",
            "media": {
                "src": "recources/Y2.mp4",
                "type": "video"
            },
            "benefits": ["Étirement complet", "Force des épaules", "Apaisement nerveux", "Amélioration circulatoire"],
            "instructions": {
                "position_initiale": "À quatre pattes, mains sous les épaules, genoux sous les hanches.",
                "execution": "1. Expirer en soulevant les genoux du sol\n2. Pousser les hanches vers le ciel\n3. Tendre les jambes sans verrouiller les genoux\n4. Garder les talons vers le sol\n5. Étirer la colonne vertébrale"
            }
        },
        {
            "id": "Y3",
            "name": "Virabhadrasana III (Guerrier III)",
            "description": "Posture d'équilibre qui renforce les jambes, le tronc et améliore la concentration.",
            "difficulty": "advanced",
            "duration": "30 secondes chaque côté",
            "media": {
                "src": "recources/Y3.png",
                "type": "image"
            },
            "benefits": ["Équilibre physique", "Concentration mentale", "Force des chevilles", "Tonification abdominale"],
            "instructions": {
                "position_initiale": "Debout, pieds joints, bras le long du corps.",
                "execution": "1. Transférer le poids sur la jambe droite\n2. Lever la jambe gauche lentement vers l'arrière\n3. Incliner le torse vers l'avant\n4. Étendre les bras vers l'avant\n5. Créer une ligne droite du talon gauche aux mains"
            }
        }
    ]
};