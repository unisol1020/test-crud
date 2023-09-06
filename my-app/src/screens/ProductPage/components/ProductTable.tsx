import React, {useContext, useState} from "react";import {IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";import EditIcon from '@mui/icons-material/Edit';import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';import ProductsContext from "../../../context/ProductsContext";import ProductFormDialog from "../modals/ProductFormDialog";import axios from "../../../lib/axios";import {IProduct} from '../../../types/api/product';const ProductTable = () => {  const {products, setProducts} = useContext(ProductsContext);  const [open, setOpen] = useState(false);  const [id, setId] = useState(0);  const handleOpenEditDialog = (id: number) => {    setOpen(true);    setId(id);  };  const handleDeleteProduct = async (id: number) => {    try {      await axios.delete(`/products/${id}`)        .then(() => {          setProducts(products.filter((product: IProduct) => product.id !== id))        });    } catch (e) {      console.error(e);    }  };  const closeDialog = () => {    setOpen(false)  };  return (    <div className="product-table">      <Table>        <TableHead>          <TableRow>            <TableCell className="name">Name</TableCell>            <TableCell className="description">Description</TableCell>            <TableCell className="url">Url</TableCell>            <TableCell className="actions">Actions</TableCell>          </TableRow>        </TableHead>        <TableBody>          {products.map((product: IProduct, index: number) => (            <TableRow key={index}>              <TableCell>{product.title}</TableCell>              <TableCell>{product.description}</TableCell>              <TableCell><a href={product.url ?? "#"}>{product.url}</a></TableCell>              <TableCell>                <IconButton onClick={() => handleOpenEditDialog(product.id!)}>                  <EditIcon/>                </IconButton>                <IconButton onClick={() => handleDeleteProduct(product.id!)}>                  <DeleteOutlineIcon color='error'/>                </IconButton>              </TableCell>            </TableRow>          ))}        </TableBody>      </Table>      <ProductFormDialog open={open} handleClose={closeDialog} productId={id}/>    </div>  );}export default ProductTable;