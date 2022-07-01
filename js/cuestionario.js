var banderas = ['<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16"><path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/></svg>',
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16"><path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/></svg>']
let preguntas = ['hola ',
                 'La unidad aritmética lógica cuenta con un registro de instrucciones', 
                 'La Memoria Caché es una memoria volátil',
                 'La unidad de memoria es quien almacena los resultados de la unidad aritmetica',
                 'La encargada del transporte de la información es la memoria Caché', 
                 'La unidad de control se encarga de realizar operaciones lógicas']
let respuestas = [false,true,true,false,false]
let puntuacion = {
    correctas:0,
    incorectas:0
}
const procesarPregunta= (respuesta, pregunta)=>{
    if (respuesta == respuestas[pregunta -1 ]) {
        puntuacion.correctas++
    }
    else{
        puntuacion.incorectas++
    }
}
const cuestionario = async()=>{
    if (puntuacion.correctas == 0 && puntuacion.incorectas == 0){
        Swal.fire({
            icon:'question',
                title: '¿Quieres comenzar un cuestionario?',
                showCancelButton: true,
                confirmButtonColor: '#ffc800',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Por supuesto',
                cancelButtonText:'No, Estoy muy verde',
                iconColor: '#ffc800'
        }).then(async(result)=>{
            if (result.isConfirmed){
                const steps = [banderas[0],'1', '2', '3','4','5', banderas[1]]
                const Queue = Swal.mixin({
                progressSteps: steps,
                showClass: { backdrop: 'swal2-noanimation' },
                hideClass: { backdrop: 'swal2-noanimation' },
                allowOutsideClick:false,
                confirmButtonColor: '#ffc800',
                iconColor: '#ffc800'
                })
                for (let i = 0; i < steps.length; i++) {
                        if (i == 0) {
                            await Queue.fire({
                                icon:'question',
                                title: '¿Listo para iniciar?',
                                currentProgressStep: i,
                                showClass: { backdrop: 'swal2-noanimation' },
                                confirmButtonText: 'Iniciar',
                            })
                        }else if (i==6) {
                            await Queue.fire({
                                icon:'success',
                                title: 'Bien hecho aca estan tus resultados',
                                text:`Tu puntuacion de: ${puntuacion.correctas} Correctas y ${puntuacion.incorectas} Incorrectas`,
                                currentProgressStep: i,
                                showClass: { backdrop: 'swal2-noanimation' },
                                confirmButtonText: 'Finalizar',
                            })
                        }else{
                            await Queue.fire({
                                icon:'question',
                                title: preguntas[i],
                                currentProgressStep: i,
                                showClass: { backdrop: 'swal2-noanimation' },
                                confirmButtonText: 'Verdadero',
                                showCancelButton : true,
                                cancelButtonText:'Falso'
                            }).then(result=>{
                                if (result.isConfirmed){
                                    procesarPregunta(result.isConfirmed, i)
                                }else{
                                    procesarPregunta(result.isConfirmed,i)
                                }
                            })
                        }
                }
            }
        })
    }else{
        Swal.fire({
            icon: 'error',
            title:'Ya has hecho el cuestionario',
            text:'Vuelve mañana y seguro tendras mejores resultados',
            iconColor: '#ffc800',
            confirmButtonColor: '#ffc800'
        })
    }
}