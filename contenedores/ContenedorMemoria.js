class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    getById(id) {
        const elem = this.elementos.find(elem => elem.id == id)
        if (!elem) {
            throw new Error(`No se encuentra el elemento a listar`)
        } else {
            return elem
        }
    }

    getAll() {
        return [...this.elementos]
    }

    post(objet) {
        let newId = this.elementos.length == 0 ? 1 : this.elementos[this.elementos.length - 1].id +1;
        const newObj = { ...objet, id: newId }
        this.elementos.push(newObj)
        return newObj
    }

    update(object) {
        const index = this.elementos.findIndex(p => p.id == object.id)
        if (index == -1) {
            throw new Error(`No se encuentra el elemento a actualizar`)
        } else {
            this.elementos[index] = object
            return object
        }
    }

    delete(id) {
        const index = this.elementos.findIndex(elem => elem.id == id)
        if (index == -1) {
            throw new Error(`No se encuentra el elemento a eliminar`)
        } else {
            return this.elementos.splice(index, 1)
        }
    }
}

export default ContenedorMemoria
