
import styles from '../auth.module.scss';
export default function EntitySelector({ selectedEntity, setSelectedEntity}){
    return(
        <div className='grid grid-flow-col auto-cols-fr gap-5 w-full mb-9'>
            <button 
                className={`w-full flex flex-col items-center justify-center bg-gray-100 p-5 rounded-lg cursor-pointer text-gray-700 ${selectedEntity === 'institution' ? styles.selected_entity : '' }`}
                onClick={() => setSelectedEntity('institution')}
            >
                <svg width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0L0 3v2h16V3z"></path><path fill="currentColor" d="M0 14h16v2H0v-2z"></path><path fill="currentColor" d="M16 7V6H0v1h1v5H0v1h16v-1h-1V7h1zM4 12H3V7h1v5zm3 0H6V7h1v5zm3 0H9V7h1v5zm3 0h-1V7h1v5z"></path></svg>
                <div className='mt-3 uppercase font-bold '>Institution</div>
            </button>
            <button 
                className={`w-full flex flex-col items-center justify-center bg-gray-100 p-5 rounded-lg cursor-pointer text-gray-700 ${selectedEntity === 'student' ? styles.selected_entity : '' }`}
                onClick={() => setSelectedEntity('student')}
            >
                <svg width="1.34em" height="1em" viewBox="0 0 1024 768"><path d="M1024 736q0 13-9.5 22.5T992 768t-22.5-9.5T960 736V315L607 492q-40 20-95 20t-95-20L39 303Q0 283 0 255.5T39 209L417 20q40-20 95-20t95 20l378 189q34 17 38 42q1 1 1 4v481zM639 556l193-97v141q0 43-93.5 73.5T512 704t-226.5-30.5T192 600V459l193 97q40 20 127 20t127-20z" fill="currentColor"></path></svg>
                <div className='mt-3 uppercase font-bold '>Student</div>
            </button>
        </div>
    )
}