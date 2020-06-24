const Color = {
  primary: (trans=1.0) => 'rgba(255,111,89,'+trans+')',  // orange
  secondary: (trans=1.0) => 'rgba(192,207,218,'+trans+')', // light light gray
  greenish: (trans=1.0) => 'rgba(0,67,70,'+trans+')',
  dark: (trans=1.0) => 'rgba(0,27,71,'+trans+')', // closer to black
  black: (trans=1.0) => 'rgba(0,0,0,'+trans+')',
}

export default Color