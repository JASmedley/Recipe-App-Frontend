import * as React from 'react'
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material'
import { Link } from 'react-router-dom'
import DeleteIcon from "@mui/icons-material/Delete"
import cookie from 'cookie'
import { useEffect,useState } from 'react'

const checkAuth = () => {
    const cookies = cookie.parse(document.cookie)
    return cookies["loggedIn"] === "true"
  }


const Listings = (props) => {
    const { recipeList } = props;



if (recipeList.length == 0) {
    return "loading"
}

    return (
        <Container maxWidth="lg" className="company-container">
            <h4>Welcome </h4>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Dietary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {recipeList.map((listing,idx) => (
                    <TableRow  key={listing.RecipeID}>
                         <Link to={`/${listing.RecipeID}`}>
                            <TableCell  height = "50px" >{recipeList.length &&recipeList[idx].RecipeName}</TableCell>
                        </Link> 
                        <TableCell>{recipeList.length &&recipeList[idx].RecipeDescription}</TableCell>
                        <TableCell>{recipeList.length &&recipeList[idx].RecipeDietary}</TableCell>
                        {checkAuth() === true && (
                        <TableCell>
                        <DeleteIcon
                            onClick={() => props.removeListing(idx)}
                            className="icon text-red"
                        />
                        </TableCell>
                    )}  
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Container>
    )
}

export default Listings