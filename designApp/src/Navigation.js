import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './screens/Login';
import Menu from './screens/Menu';
import Products from './screens/Products';
import RegisterProduct from './screens/RegisterProd';

const MenuRoutes = {
    Menu:{
        name: 'Menu',
        screen: Menu
    },
    Products:{
        name: 'Products',
        screen: Products,
        navigationOptions: {
            title: 'Meus Produtos'
        }
    },
    RegisterProduct:{
        name: 'RegisterProduct',
        screen: RegisterProduct,
        navigationOptions:{
            title:'Registrar Produto'
        }
    }
}

const MenuConfig = {
    initialRouteName: 'Menu'
}

const drawerRoutes = createDrawerNavigator(MenuRoutes, MenuConfig);

const MainRoutes = {
    Login:{
        name:'Login',
        screen: Login
    },
    Menu:{
        name: 'Menu',
        screen: drawerRoutes
    }
}

const MainNavigator = createSwitchNavigator(MainRoutes, {initialRouteName: 'Login'});
const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;