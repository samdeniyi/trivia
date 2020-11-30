import React from "react";

import useRouter from "use-react-router"
import { matchPath } from "react-router-dom"

export default function getParams(path) {
    const { location } = useRouter()
    const { pathname } = location
  
    const pattern = `(.*)?${path}`
    const match = matchPath(pathname, { path: pattern }) || {}
  
    return match.params
  }