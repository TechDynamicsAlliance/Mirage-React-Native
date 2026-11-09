
import { useState } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Host,
  Column,
  Row,
  Spacer,
  Icon,
  IconButton,
  Image,
  Text,
  Card,
  LazyRow,
  DockedSearchBar,
  NavigationBar,
  NavigationBarItem,
  useMaterialColors,
} from '@expo/ui/jetpack-compose';

import {
  fillMaxSize,
  fillMaxWidth,
  size,
  width,
  height,
  paddingAll,
  weight,
  clip,
  Shapes,
} from '@expo/ui/jetpack-compose/modifiers';

import Menu from '@expo/material-symbols/menu.xml';
import Notifications from '@expo/material-symbols/notifications.xml';
import AccountCircle from '@expo/material-symbols/account_circle.xml';
import Search from '@expo/material-symbols/search.xml';
import Tune from '@expo/material-symbols/tune.xml';
import Home from '@expo/material-symbols/home.xml';
import Restaurant from '@expo/material-symbols/restaurant.xml';
import QrCodeScanner from '@expo/material-symbols/qr_code_scanner.xml';
import Chat from '@expo/material-symbols/chat_bubble.xml';
import Settings from '@expo/material-symbols/settings.xml';
import Eco from '@expo/material-symbols/eco.xml';
import WaterDrop from '@expo/material-symbols/water_drop.xml';
import Inventory from '@expo/material-symbols/inventory_2.xml';

const MEALS = [
  {
    id: '1',
    name: 'Tender Beef Steak',
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600',
    protein: '25.4%',
    fat: '15.4%',
    carbs: '5.7%',
  },
  {
    id: '2',
    name: 'Fresh Vegetable Salad',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    protein: '8.2%',
    fat: '6.2%',
    carbs: '12.5%',
  },
  {
    id: '3',
    name: 'Grilled Chicken',
    image:
      'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600',
    protein: '32.6%',
    fat: '12.4%',
    carbs: '3.5%',
  },
  {
    id: '4',
    name: 'Healthy Breakfast',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600',
    protein: '18.2%',
    fat: '9.4%',
    carbs: '21.5%',
  },
];

const SEED_COLOR = '#d303fc';

function MealCard({ meal }: { meal: typeof MEALS[number] }) {
  const colors = useMaterialColors();

  return (
    <Card
      colors={{
        containerColor: colors.surfaceContainerHighest,
        contentColor: colors.onSurface,
      }}
      modifiers={[width(245)]}
    >
      <Column
        horizontalAlignment="center"
        verticalArrangement={{ spacedBy: 12 }}
        modifiers={[paddingAll(16)]}
      >
        <Image
          source={{ uri: meal.image }}
          contentDescription={meal.name}
          contentScale="crop"
          modifiers={[
            size(205, 205),
            clip(Shapes.Circle),
          ]}
        />

        <Text
          color={colors.onSurface}
          style={{
            fontSize: 21,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {meal.name}
        </Text>

        <Row
          horizontalArrangement={{ spacedBy: 25 }}
          verticalAlignment="center"
        >
          <Column horizontalAlignment="center">
            <Icon source={Eco} tint="#78AD45" />
            <Text color={colors.onSurface}>
              {meal.protein}
            </Text>
          </Column>

          <Column horizontalAlignment="center">
            <Icon source={WaterDrop} tint="#F5A500" />
            <Text color={colors.onSurface}>
              {meal.fat}
            </Text>
          </Column>

          <Column horizontalAlignment="center">
            <Icon source={Inventory} tint="#E65B5B" />
            <Text color={colors.onSurface}>
              {meal.carbs}
            </Text>
          </Column>
        </Row>
      </Column>
    </Card>
  );
}

function DashboardContent() {
  const colors = useMaterialColors();

  const [query, setQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('home');

  const filteredMeals = MEALS.filter(meal =>
    meal.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Column
      modifiers={[
        fillMaxSize(),
        paddingAll(20),
      ]}
      verticalArrangement={{ spacedBy: 22 }}
    >

      {/* HEADER */}
      <Row
        verticalAlignment="center"
        horizontalArrangement={{ spacedBy: 12 }}
      >
        <IconButton onClick={() => {}}>
          <Icon
            source={Menu}
            tint={colors.onBackground}
            contentDescription="Menu"
          />
        </IconButton>

        <Spacer modifiers={[weight(1)]} />

        <IconButton onClick={() => {}}>
          <Icon
            source={Notifications}
            tint={colors.onBackground}
            contentDescription="Notifications"
          />
        </IconButton>


      </Row>

      {/* HERO */}
      <Column verticalArrangement={{ spacedBy: 0 }}>
        <Text
          color={colors.onBackground}
          style={{
            fontSize: 38,
            fontWeight: '800',
            letterSpacing: -1.5,
          }}
        >
          Let's Find You
        </Text>

        <Text
          color={colors.onSurfaceVariant}
          style={{
            fontSize: 38,
            fontWeight: '800',
            letterSpacing: -1.5,
          }}
        >
         New Recipe's
        </Text>
      </Column>

      {/* SEARCH */}
      <Row
        verticalAlignment="center"
        horizontalArrangement={{ spacedBy: 10 }}
      >
        <Column modifiers={[weight(1)]}>
          <DockedSearchBar
            onQueryChange={setQuery}
            modifiers={[fillMaxWidth()]}
          >
            <DockedSearchBar.Placeholder>
              <Text color={colors.onSurfaceVariant}>
                Search a recipe...
              </Text>
            </DockedSearchBar.Placeholder>

            <DockedSearchBar.LeadingIcon>
              <Icon
                source={Search}
                tint={colors.onSurfaceVariant}
                contentDescription="Search"
              />
            </DockedSearchBar.LeadingIcon>
          </DockedSearchBar>
        </Column>

        <IconButton onClick={() => {}}>
          <Icon
            source={Tune}
            tint={colors.onBackground}
            contentDescription="Filters"
          />
        </IconButton>
      </Row>

      {/* LAST SCANS HEADER */}
      <Row
        verticalAlignment="center"
        horizontalArrangement="spaceBetween"
        modifiers={[fillMaxWidth()]}
      >
        <Text
          color={colors.onBackground}
          style={{
            fontSize: 28,
            fontWeight: 'bold',
          }}
        >
          Recent Searches
        </Text>

        <Text
          color={colors.onSurfaceVariant}
          style={{
            fontSize: 16,
            fontWeight: '600',
          }}
        >
          See all
        </Text>
      </Row>

      {/* MEAL CARDS */}
      <LazyRow
        horizontalArrangement={{ spacedBy: 16 }}
        verticalAlignment="center"
      >
        {filteredMeals.map(meal => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </LazyRow>

      <Spacer modifiers={[weight(1)]} />



    </Column>
  );
}

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Host
        style={{ flex: 1 }}
        seedColor={SEED_COLOR}
        colorScheme={colorScheme}
      >
        <DashboardContent />
      </Host>
    </SafeAreaView>
  );
}
