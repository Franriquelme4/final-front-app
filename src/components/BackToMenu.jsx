import { ArrowForwardIcon, Text, Flex, ArrowBackIcon } from 'native-base'
import { TouchableWithoutFeedback } from 'react-native'
import { Link } from 'react-router-native'

export default function BackToMenu({ path, title }){
    return <Link to="/" component={TouchableWithoutFeedback}>
        <Flex 
            p={2}
            direction='row'
            alignItems='center'
            borderRadius={10}
            
        >
            <ArrowBackIcon />
            <Text m={1}>Menu</Text>
        </Flex>
    </Link>
}