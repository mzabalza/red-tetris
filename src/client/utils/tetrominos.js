export const TETROMINOS = {
    0: { shape: [[0]], color: '255, 255, 255' },
    I: {
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],

        color: '80, 227, 230'
        // color: '171, 40, 47'

    },
    J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0]
        ],

        color: '36, 95, 223'
        // color: '171, 40, 47'

    },
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L']
        ],

        color: '223, 173, 36'
        // color: '171, 40, 47'

    },
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O']
        ],

        color: '223, 217, 36'
        // color: '253, 104, 84'

    },
    S: {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0]
        ],

        color: '48, 211, 56'
        // color: '150, 29, 5'

    },
    T: {
        shape: [
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0]
        ],

        color: '132, 61, 198'
        // color: '255, 59, 20'

    },
    Z: {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0]
        ],

        color: '227, 78, 78'
        // color: '255, 59, 20'

    },
    G: {
        shape: ['G'],
        color: '65, 65, 65'
        // color: '255, 59, 20'

    }
}

export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino];
}