import { Heading, View } from 'native-base'
import HomeListItem from '../components/HomeListItem'
import {menuItems} from '../constants/menuItems'

// console.log(menuItems,"menu items");
export default function Home(){
    return <View>
        <Heading>Menu</Heading>
        <View mt={3}>
            {menuItems.map(menuItem => <View mt={5}>
                <HomeListItem path={menuItem.route} title={menuItem.name} />
            </View>)}
        </View>
    </View>
}
