import React, { useState } from 'react'
import ThemeContext from './ThemeContext';
const themes={
    light:{
        backgroundColor:"#FFF",
        color:"#000"
    },
    dark:{
        backgroundColor:"#000",
        color:"#FFF"
    }
}
export default function ChangeTheme({children}) {
    const [theme,setTheme]=useState(themes.light);
    const toggleTheme=()=>{
         setTheme((t)=> (t===themes.light?themes.dark:themes.light))
    }
  return (
     <ThemeContext.Provider value={{theme:theme,toggleTheme:toggleTheme}}>
        {children}
     </ThemeContext.Provider>
  )
}
