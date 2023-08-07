import { StyleProp, TextStyle, ViewStyle, Text, TouchableHighlight, View } from 'react-native'

type DrawerItemProps = {
    label: string,
    iconLeft?: React.ReactNode,
    iconRight?: React.ReactNode,
    labelRight?: string,
    labelStyle?: StyleProp<TextStyle>,
    onPress: () => void,
    style?: StyleProp<ViewStyle>,
}

const DrawerItem = ({
    label,
    iconLeft,
    iconRight,
    labelRight,
    labelStyle,
    onPress,
    style,
}: DrawerItemProps) => {
  return (
    <TouchableHighlight
        onPress={onPress}
        style={[
            {
                flexDirection: 'row',
                height: 50,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 10,
                alignItems: 'center',
                marginHorizontal: 10
            },
            style,
        ]}
        underlayColor="#529be0"
    >
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                {iconLeft}
                <Text style={[{ fontSize: 15, color: 'white', marginLeft: 10 }, labelStyle]}>
                    {label}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                {iconRight}
                <Text style={{ fontSize: 15, color: 'white' }}>
                    {labelRight}
                </Text>
            </View>
        </View>
    </TouchableHighlight>
  )
}

export default DrawerItem