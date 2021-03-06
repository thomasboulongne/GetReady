export default {
	discover: 'découvrir',
	Gallery: 'Galerie',
	next: 'suivant',
	intro: {
		step1: {
			sentences: {
				1: 'Nous avons tous un objectif à atteindre.',
				2: 'Qu\'il soit sportif, personnel ou encore professionnel...',
				3: 'Avez-vous le votre en tête ?'
			}
		},
		step2: {
			sidePanel: {
				heading: 'Un bon objectif devrait être :'
			},
			formPanel: {
				subheading: 'Grâce à ces conseils,',
				heading: 'Formulez votre objectif',
				text: 'Les personnes qui écrivent leur objectif ont 42% de réussite en plus que celles qui se contentent de le penser.',
				placeholder: 'Mon objectif est...',
				Example: 'Exemple :',
				examples: {
					1: 'Avoir son bac avec mention',
					2: 'Courir le marathon de Paris en moins de 3h'
				},
				submit: 'Valider'
			}
		},
		step4: {
			text: 'Pour t’aider dans ton projet, nous te présentons  trois grandes étapes clés pour réussir à atteindre ton objectif.'
		}
	},
	categories: {
		like: 'comme',
		items: [
			{
				title: 'S\'organiser',
				athlete: 'Usain Bolt',
				slug: 's-organiser',
				img: '~/assets/images/athletes/bolt.png',
				color: '#fd6246',
				position: {
					x: 1.4,
					y: 0
				},
				shadow: {
					x: 0.7,
					y: 0
				}
			},
			{
				title: 'Se concentrer',
				athlete: 'Serena Williams',
				slug: 'se-concentrer'
			},
			{
				title: 'Se visualiser',
				athlete: 'Michael Phelps',
				slug: 'se-visualiser'
			}
		]
	},
	cards: {
		1: {
			title: 'Positif',
			text: 'Il doit être exprimé positivement car il n\'est pas possible de se représenter une négation.'
		},
		2: {
			title: 'Spécifique',
			text: 'Suffisamment précis, présenter des caractéristiques propres.'
		},
		3: {
			title: 'Mesurable',
			text: 'Il peut avoir un indicateur de résultat, ou à défaut, nos sens doivent nous permettre de déterminer précisément à quel moment l’objectif sera atteint.'
		},
		4: {
			title: 'En harmonie',
			text: 'L’objectif doit être en accord avec vos valeurs et croyances et, compatible avec l’atteinte de ses autres objectifs.'
		},
		5: {
			title: 'Réaliste',
			text: 'Il prend en compte les facteurs extérieurs, qui ne peuvent pas être sous votre contrôle. Il peut être ambitieux pour représenter un défi motivant, tout en restant atteignable.'
		},
		6: {
			title: 'Temporel',
			text: 'Il doit être positionné dans le temps et donc avoir une échéance précise.'
		}
	}
};
