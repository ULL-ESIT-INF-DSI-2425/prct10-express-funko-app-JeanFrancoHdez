import net from 'net'
import fs from 'fs'
import { Funko } from './funko.js'
import chalk from "chalk"
import path from 'path'

class funkoServidor {
  lista: Funko[] = []

  cargarDatos(usuario: string) {
    let ruta = "./src/usuarios"
    fs.readdir(ruta, (err) => {
      if (err) {
        console.log(chalk.red("Ha ocurrido un error a la hora de leer el directorio", err.message))
      }
      let user_path = path.join(ruta, usuario)
      fs.mkdir(user_path, () => {
        fs.readdir(user_path, (err, user_files) => {
          if(err) {
            console.log(chalk.red(`Ha ocurrido un error a la hora de leer el directorio`, err.message))
          }
          user_files.forEach(file => {
            let file_path = path.join(user_path, file)
            fs.readFile(file_path, 'utf-8', (err, data) => {
              if (err) {
                console.log(chalk.red(`Ha ocurrido un error a la hora de leer el fichero ${file}`, err.message))
              }
              try {
                const funkoData = JSON.parse(data);
                const funko = new Funko(funkoData.id, funkoData.nombre, funkoData.tipo, funkoData.coste);
                this.lista.push(funko);
              } catch {
                console.log(chalk.red(`Error al parsear el fichero ${file}`));
              }
            })
          })
        })
      })
    })
  }

  guardarDatos(usuario: string) {
    let camino = `./src/usuarios/${usuario}`
    this.lista.forEach(funko => {
      let path_funko = path.join(camino, funko.id.toString() + ".json")
      console.log(path_funko)
      fs.writeFile(path_funko, JSON.stringify(funko), (err) => {
        if (err) {
          console.log('Ha ocurrido un error a la hora de escribir los funkos')
          process.exit(1)
        }
        console.log(`Se ha escrito el funko ${funko.id}`)
      })
    })
  }

  añadir(user: string, funko: Funko) {
    this.cargarDatos(user)

    let index: number = this.lista.findIndex(a => a.id === funko.id)

    if (index !== -1) {
      return chalk.red("No se puedo agregar el funko. Ya existe")
    }

    this.lista.push(funko)
    return chalk.green(`Se ha agregado el funko en el usuario ${user}`)
  }

  eliminar(user: string, funko: Funko) {
    this.cargarDatos(user)
    console.log(this.lista)

    let index: number = this.lista.findIndex(a => a.id === funko.id)

    if (index === -1) {
      return chalk.red("No se pudo eliminar el funko. No existe")
    }

    this.lista.slice(index, 1)
    return chalk.green(`Se ha eliminado el funko en el usuario ${user}`)
  }

  listar(user: string) {
    let resultado: string = ""
    this.cargarDatos(user)
    resultado += `${user} Coleccion de Funko Pop`
    this.lista.forEach(funko => {
      resultado += "------------------------"
      resultado += `ID: ${funko.id}`
      resultado += `Nombre: ${funko.nombre}`
      resultado += `Tipo: ${funko.tipo}`
      resultado += `Coste: ${funko.coste}`
    })
    return resultado
  }

  mostrar(user: string, id: number) {
    this.cargarDatos(user)
    let index: number = this.lista.findIndex(a => a.id === id)

    if (index === -1) {
      return chalk.red("No se encuentra el Funko")
      process.exit(1)
    }
    let resultado: string = ""

    resultado += `ID: ${this.lista[index].id}`
    resultado += (`Nombre: ${this.lista[index].nombre}`)
    resultado += (`Tipo: ${this.lista[index].tipo}`)
    resultado += (`Coste: ${this.lista[index].coste}`)

    return resultado
  }
}

const servidor = net.createServer(socket => {
  console.log(chalk.green("Cliente conectado"));
  const servidorInstance: funkoServidor = new funkoServidor();

  socket.on('data', (data) => {
    const mensaje = JSON.parse(data.toString())
    let resultado = ""
    servidorInstance.cargarDatos(mensaje.usuario)

    switch(mensaje.comando) {
      case 'add':
        resultado = servidorInstance.añadir(mensaje.usuario, new Funko(mensaje.id, mensaje.nombre, mensaje.tipo, mensaje.coste))
        break;
      case 'eliminar':
        resultado = servidorInstance.eliminar(mensaje.usuario, new Funko(mensaje.id, mensaje.nombre, mensaje.tipo, mensaje.coste));
        break;
      case 'listar':
        resultado = servidorInstance.listar(mensaje.usuario);
        break;
      case 'mostrar':
        resultado = servidorInstance.mostrar(mensaje.usuario, mensaje.id);
        break;
    }
    socket.write(resultado)
    servidorInstance.guardarDatos(mensaje.usuario)
  })

  socket.on('end', () => {
    console.log(chalk.yellow("Cliente desconectado"));
  });
})

servidor.listen(60300, () => {
  console.log(chalk.blue("Servidor Funko en ejecución en el puerto 60300"));
});