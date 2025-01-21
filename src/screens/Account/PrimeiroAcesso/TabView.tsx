import React, { useRef } from 'react'
import Paragrafo from '../../../components/typography/Paragrafo'
import { View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'

interface TabViewProps {
  children: React.ReactNode[];
}

const TabView: React.FC<TabViewProps> = ({ children }) => {
  const deviceWidth = Dimensions.get('window').width
  const scrollViewRef = useRef<ScrollView | null>(null)

  const scrollLeft = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  };

  return (
    <>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: deviceWidth * children.length }}
      >
        {children.map((child, index) => (
          <View
            key={index}
            className='flex-1'
            style={{ width: deviceWidth }}
          >
            <>
              { index === 1 ?
                  <>
                    <TouchableOpacity
                      onPress={scrollLeft}
                      className='absolute left-10 bottom-12 flex-row items-center z-50'
                    >
                      <Paragrafo title='Voltar' />
                    </TouchableOpacity>
                    {child}
                  </>
                  :
                  <>
                    {child}
                  </>
              }
            </>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default TabView;
