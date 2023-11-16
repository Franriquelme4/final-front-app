import { ArrowForwardIcon, Text, Flex } from 'native-base'
import { TouchableWithoutFeedback } from 'react-native'
import { Link } from 'react-router-native'

export default function HomeListItem({ path, title }){
    return <Link to={path} component={TouchableWithoutFeedback}>
        <Flex 
            p={2}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            borderWidth={1}
            borderRadius={10}
            borderColor='gray.300'
            
        >
            <Text>{title}</Text>
            <ArrowForwardIcon />
        </Flex>
    </Link>
}