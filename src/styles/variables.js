const dashboardActions = {
	'AGENCYBANKING': '#eae7ff',
	'FINANCIAL': '#e5f5ff',
	'SHOP':      '#dff2ec',
	'CONTACTS':  '#fff6e5',
	'LEARNING': '#ffe2de',
	'SERVICES': '#e5f5ff'
};

const myShop = {
	profit: {
		profit: '#4e9700',
		loss:   '#ff0000'
	},
	totalSales: {
		bg:   '#4e970040',
		text: '#4e9700'
	},
	totalOwed: {
		bg:   '#d47c0c40',
		text: '#d47c0c'
	},
	inventory: {
		bg:   '#5473e740',
		text: '#5473e7'
	},
	product: {
		inStock: {
			bg:   '#4e970040',
			text: '#4e9700'
		},
		outOfStock: {
			bg:   '#e0202040',
			text: '#e02020'
		}
	},
	orders: {
		bg:   '#579fd740',
		text: '#579fd7'
	},
	customers: {
		bg:   '#0091ff40',
		text: '#0091ff'
	},
	warning: '#fff6e6',
	pending: {
		bg:   '#f0a82140',
		text: '#f0a821'
	},
	packed: {
		bg:   '#f2f5fa',
		text: '#4e9700'
	},
	delivered: {
		bg:   '#4e970040',
		text: '#4e9700'
	},
	rejected: {
		bg:   '#e0202040',
		text: '#e02020'
	}
};

const transactions = {
	pending:    '#ffc106',
	paid:       '#4b8e03',
	withdrawal: '#e02020'
};

const performanceChart = {
	"MERCHANTS": '#0095ff',
	"AGENTS":    '#41d6ba',
	"ORDERS":    '#fa6400'
};

const colors = {
	aquamarine: '#a7d9ff33',
	badge: 		{
		lightOrange: {
			text: '#d47c0c',
			bg:   '#d47c0c40'
		},
		lightBlue: {
			text: "#62a9dc",
			bg:   "#419bf910"
		}
	},
	background: {
		default:   	    '#eee',
		header:         '#fff',
		component: 	    '#f7f7f7',
		progressBar:	'#d8d8d8',
		overlay:        '105 105 105',
		slidingOverlay: '255 255 255',
		ripple:    		'#e4eeff',
		logo: 	   		'#559fd71a',
		circle:			'#4e86c6',
		walletBadge:	'#22a8ff'
	},
	themeTextColor1: '#212c3d',
	themeTextColor2: '#e8e8e8',
	themeTextColor3: '#56636d',
	themeTextColor4: '#919394',
	themeColor1: 	 '#027CD2',
	themeColor2:     '#212c3d',
	themeColor3:     '#f2f5fa',
	themeColor4:     '#0000001f',
	themeColor5:     '#56636d1a',
	themeColor6:     '#838f9a',
	skyBlue:         '#A7D9FF',
	darkGrey:        '#8f959d',
	lightGrey:       '#a3acb3',
	border: {
		default: '#f2f5fa',
		active:  '#212c3d',
		input: 	 '#a3acb3',
		error:   '#e02020',
		top: 	 '#f0f0f0',
		bottom:  '#f0f0f0'
	},
	setting: {
		userTypeBg: '#579fd733',
		userTypeTextColor: '#579fd7',
		agentTier1Bg: '#4caf5033',
		agentTier1TextColor: '#4caf50',
		agentTier2Bg: '#11237d33',
		agentTier2TextColor: '#11237d',
	},
	link: {
		inactive: 'rgb(86, 99, 109)',
		active:   '#579FD7'
	},
	popup: {
		header:       '#333238',
		cancelButton: '#f0f0f0',
		confirm: 	  '#4e9700',
		reject: 	  '#e02020'
	},
	linkHoverColor:   '#00FFFF',
	lightBoldBlue:    '#1260b8',
	blueish: 		  'rgba(87, 159, 215, .2)',
	gray1:   		  '#cccccc',
	gray2:   		  '#dddddd',
	gray3:   		  '#eeeeee',
	smoothGreyText:   '#6c7984',
	gray5:   		  '#aaa',
	yellow:  		  '#FFFF00',
	yellowBg:  	      '#ffebaf',
	green:   		  '#5cbb23',
	greenText:   	  '#6dd400',
	greenBg:   	  	  '#dcffb7',
	orange:           '#fa6400',
	orangeGradient:   '#ffac74',
	red:     		  '#e02020',
	redBg:     		  '#ff9a9a',
	lightRed: 		  '#ffdfdf',
	lightYellow:      '#fff6e6',
	blue:    		  '#579fd7',
	blue2:    		  '#62a9dc',
	silver:  		  '#f2f2f2',
	white:   		  '#fff',
	black:   		  '#333',
	dashboardActions: { ...dashboardActions },
	transactions:     { ...transactions },
	performanceChart: { ...performanceChart },
	myShop:           { ...myShop }
};

const fonts = {
	main: `'Montserrat', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
	redesign: `'Inter', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif`
};

export { colors, fonts };
