// Configurações do Sistema de Roteamento Ortogonal
export const CONFIG = {
    // Configurações do Grid
    GRID: {
        COLS: 25, // 1000 / 40
        ROWS: 30, // 1200 / 40
        CELL_SIZE: 30, // Grid de 40x40px para preencher toda a área
        SPACING: 20, // Espaçamento de 20px para grid denso
        SNAP_ENABLED: true // true para snap no grid, false para posicionamento livre
    },

    // Configurações dos Blocos
    BLOCKS: {
        MARGIN: 20, // Margem ao redor dos blocos
        MIN_DISTANCE: 40, // Distância mínima entre blocos (em pixels)
        MIN_DISTANCE_CHECK: true, // Verificar distância mínima entre blocos
        COLLISION_CHECK: false, // Verificar colisão entre blocos (impedir sobreposição)
        INNER_SIZE_RATIO: 0.6, // Tamanho do bloco interno 
        PSEUDO_CONNECTOR_SIZE: 8, // Tamanho do pseudo-conector
        PSEUDO_CONNECTOR_OFFSET: 4, // Metade do tamanho do pseudo-conector
        CONNECTOR_MARGIN: 10, // Margem para pontos extras ao redor dos blocos
        SEARCH_RADIUS: 2, // Raio de busca para posicionamento válido
        ADD_MODE: 'center' // 'center' ou 'random'
    },

    // Configurações de Renderização
    RENDERING: {
        COLORS: {
            PRIMARY: '#4a90e2',
            SECONDARY: '#7b68ee',
            SUCCESS: '#4ecdc4',
            ERROR: '#ff6b6b',
            WARNING: '#ffd700',
            INFO: '#95e1d3',
            TEXT: '#dcdcdc',
            GRID: '#1f1f1f',
            RULER: '#ff6b6b',
            FIXED_GRID: '#ffbe0b', // Nova cor para a malha fixa
            CONNECTION: '#4a90e2' // Cor das linhas de conexão
        },
        STROKES: {
            CONNECTION_WIDTH: 3,
            GRID_WIDTH: 1,
            RULER_WIDTH: 2,
            MARKER_SIZE: 4
        },
        OPACITY: {
            NORMAL: 1,
            DRAGGING_INVALID: 0.7,
            PSEUDO_CONNECTOR: 0.8
        }
    },

    // Configurações do Router
    ROUTER: {
        DIRECTION_CHANGE_PENALTY: 200,
        POINT_TOLERANCE: 1,
        PATH_OPTIMIZATION: true,
        MAX_CONNECTION_DISTANCE: 1000,
        MAX_PATH_LENGTH: 20,
        MIN_DISPLACEMENT: 10,
        USE_ASTAR: false,         
        SNAP_TOLERANCE: 0.5,        
        MAX_REFERENCE_POINTS: 50,   
        ENABLE_CACHING: true,      
        CACHE_SIZE: 50,         
        BATCH_UPDATES: true,     
        SIMPLIFY_PATHS: true     
    },

    // Configurações de Conectores
    CONNECTORS: {
        POSITIONS: ['top', 'right', 'bottom', 'left'],
        TYPES: {
            INLET: 'inlet',
            OUTLET: 'outlet'
        },
        RULES: {
            ALLOW_SAME_BLOCK: false,
            REQUIRE_OUTLET_TO_INLET: true
        },
        LINE_STYLES: {
            SOLID: 'solid',
            DOTTED: 'dotted'
        },
        SELECT_ON_CLICK: true
    },

    // Configurações de Debug/Visualização
    DEBUG: {
        SHOW_GRID: true,
        SHOW_RULERS: false,
        SHOW_POINTS: true,
        SHOW_PATH: true,
        OPTIMIZE_RULERS: true, 
        OPTIMIZE_POINTS: true 
    },

    INITIAL_COLORS: {
        GRID: '#1a1a1a',     
        CONNECTION: '#4a90e2' 
    }
};

//fallback
export function getConfig(path, defaultValue = null) {
    const keys = path.split('.');
    let current = CONFIG;
    
    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            return defaultValue;
        }
    }
    
    return current;
}

// update
export function updateConfig(path, value) {
    const keys = path.split('.');
    let current = CONFIG;
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
}

// controllers
export function initializeColors() {
    const gridColor = document.getElementById('gridColor');
    const connectionColor = document.getElementById('connectionColor');
    
    if (gridColor) {
        const initialGridColor = getConfig('INITIAL_COLORS.GRID', '#888888');
        gridColor.value = initialGridColor;
        updateConfig('RENDERING.COLORS.GRID', initialGridColor);
    }
    
    if (connectionColor) {
        const initialConnectionColor = getConfig('INITIAL_COLORS.CONNECTION', '#4a90e2');
        connectionColor.value = initialConnectionColor;
        updateConfig('RENDERING.COLORS.CONNECTION', initialConnectionColor);
    }
} 

// random Colors
export function getRandomColor() {
    if (typeof getConfig !== 'function') {
        // Fallback para cores padrão se getConfig não estiver disponível
        const defaultColors = ['#4a90e2', '#7b68ee', '#4ecdc4', '#ff6b6b', '#ffd700', '#95e1d3'];
        return defaultColors[Math.floor(Math.random() * defaultColors.length)];
    }
    
    const colors = getConfig('RENDERING.COLORS');
    const colorArray = [
        colors.PRIMARY,
        colors.SECONDARY,
        colors.SUCCESS,
        colors.ERROR,
        colors.WARNING,
        colors.INFO
    ];
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}