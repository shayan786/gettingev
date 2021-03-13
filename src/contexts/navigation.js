import React, { Component } from 'react';
import Icon from '../components/Icon/Icon.js';

const NavigationContext = React.createContext();

export const NAV_ITEMS = [
  {
    displayName: "Home",
    pageTitle: "Welcome to AppDynamics",
    location: "/",
    active: true,
    icon: <Icon
      size="default"
      type="locations"
      name="nav_home"
      color="light" />,
    expanded: true,
    subNavItems: []
  },
  {
    displayName: "Incidents",
    location: "/incidents",
    active: false,
    icon: <Icon
      size="default"
      type="locations"
      name="nav_incidents"
      color="light" />,
    subNavItems: []
  },
  {
    displayName: "Analytics",
    location: "/analytics",
    active: false,
    icon: <Icon
      size="default"
      type="locations"
      name="anomalyDetection"
      color="light" />,
    subNavItems: [
      {
        icon: null,
        displayName: "Collections",
        active: false,
        location: "/analytics"
      },
      {
        icon: null,
        displayName: "Object Explorer",
        active: false,
        location: "/analytics/object-explorer"
      },
      {
        icon: null,
        displayName: "All Events",
        active: false,
        location: "/analytics"
      },
      {
        icon: null,
        displayName: "Traces",
        active: false,
        location: "/analytics"
      },
      {
        isDivider: true
      },
      {
        icon: null,
        displayName: "Featured Analytics",
        isTitle: true
      },
      {
        icon: null,
        displayName: "Application Performance Tuning",
        active: false,
        location: "/analytics"
      },
      {
        icon: null,
        displayName: "Trend Analysis",
        active: false,
        location: "/analytics"
      },
      {
        icon: null,
        displayName: "Dependency Analysis",
        active: false,
        location: "/analytics"
      },
      {
        icon: null,
        displayName: "Funnel Analysis",
        active: false,
        location: "/analytics"
      },
      {
        icon: null,
        displayName: "Release Validation",
        active: false,
        location: "/analytics"
      },
      {
        icon: null,
        displayName: "Performance Comparisons",
        active: false,
        location: "/analytics"
      },
      {
        icon: null,
        displayName: "QA Integration Testing",
        active: false,
        location: "/analytics"
      },
      {
        icon: null,
        displayName: "System Health Analysis",
        active: false,
        location: "/analytics"
      }
    ]
  },
  {
    displayName: "Dashboards",
    location: "/dashboards",
    active: false,
    icon: <Icon
      size="default"
      type="locations"
      name="dashboards"
      color="light" />,
    subNavItems: [
      {
        icon: null,
        displayName: "Library",
        active: false,
        location: "/dashboards"
      },
      {
        isDivider: true
      },
      {
        icon: null,
        displayName: "Featured Dashboards",
        isTitle: true
      },
      {
        icon: null,
        displayName: "All Services Dashboard",
        active: false,
        location: "/dashboards"
      },
      {
        icon: null,
        displayName: "Synthetic Dashboard",
        active: false,
        location: "/dashboards"
      },
      {
        icon: null,
        displayName: "End User Impact Dashboard",
        active: false,
        location: "/dashboards"
      },
      {
        icon: null,
        displayName: "Network Visibility Dashboard",
        active: false,
        location: "/dashboards"
      },
      {
        icon: null,
        displayName: "Business Dashboard",
        active: false,
        location: "/dashboards"
      },
      {
        icon: null,
        displayName: "Applications Dashboard",
        active: false,
        location: "/dashboards"
      },
      {
        icon: null,
        displayName: "Operations Dashboard",
        active: false,
        location: "/dashboards"
      },
      {
        icon: null,
        displayName: "QA Dashboard",
        active: false,
        location: "/dashboards"
      },
      {
        icon: null,
        displayName: "Developer Dashboard",
        active: false,
        location: "/dashboards"
      },
      {
        icon: null,
        displayName: "Backend Dashboard",
        active: false,
        location: "/dashboards"
      }
    ]
  },
  {
    displayName: "Alerting",
    location: "/alerting-templates",
    active: false,
    icon: <Icon
      size="default"
      type="locations"
      name="alertAndRespond"
      color="light" />,
    expanded: false,
    subNavItems: [
      {
        icon: null,
        displayName: "Templates",
        active: false,
        location: "/alerting-templates"
      },
      {
        icon: null,
        displayName: "Health Rules",
        active: false,
        location: "/alerting"
      },
      {
        icon: null,
        displayName: "Policies",
        active: false,
        location: "/alerting"
      },
      {
        icon: null,
        displayName: "Actions",
        active: false,
        location: "/alerting"
      },
      {
        isDivider: true
      },
      {
        icon: null,
        displayName: "Featured Templates",
        isTitle: true
      },
      {
        icon: null,
        displayName: "Black Friday Sale",
        active: false,
        location: "/alerting"
      },
      {
        icon: null,
        displayName: "Business Transaction",
        active: false,
        location: "/alerting"
      },
      {
        icon: null,
        displayName: "Infastructure",
        active: false,
        location: "/alerting"
      }
    ]
  },
  {
    displayName: "Configuration",
    location: "/configure",
    active: false,
    icon: <Icon
      size="default"
      type="actions"
      name="configure"
      color="light" />,
    expanded: false,
    subNavItems: [
      {
        icon: null,
        displayName: "Overview",
        active: false,
        location: "/configure"
      },
      {
        icon: null,
        displayName: "Set Default Context",
        active: false,
        location: "/configure"
      },
      {
        isDivider: true
      },
      {
        icon: null,
        displayName: "Agent Installer",
        active: false,
        location: "/configure/agent-installer"
      },
      {
        icon: null,
        displayName: "Cloud Platforms",
        active: false,
        location: "/configure"
      },
      {
        icon: null,
        displayName: "Data Collectors",
        active: false,
        location: "/configure"
      },
      {
        icon: null,
        displayName: "Configure BTs",
        active: false,
        location: "/configure"
      },
      {
        icon: null,
        displayName: "Configure Service Endpoints",
        active: false,
        location: "/configure"
      },
      {
        isDivider: true
      },
      {
        icon: null,
        displayName: "End User Monitoring",
        isTitle: true
      },
      {
        icon: null,
        displayName: "Browser",
        active: false,
        location: "/configure"
      },
      {
        icon: null,
        displayName: "Mobile Applications",
        active: false,
        location: "/configure"
      },
      {
        icon: null,
        displayName: "Connected Devices",
        active: false,
        location: "/configure"
      },
      {
        icon: null,
        displayName: "Synthetics",
        active: false,
        location: "/configure"
      }
    ]
  },
  {
    displayName: "Help",
    location: "/help",
    active: false,
    icon: <Icon
      size="default"
      type="actions"
      name="help"
      color="light" />,
    expanded: false,
    subNavItems: [
      {
        icon: null,
        displayName: "Directory",
        active: false,
        location: "/help"
      },
      {
        icon: null,
        displayName: "Learn",
        active: false,
        location: "/learn"
      },
      {
        icon: null,
        displayName: "Community",
        active: false,
        location: "/learn"
      },
      {
        icon: null,
        displayName: "Documentation",
        active: false,
        location: "/learn"
      },
      {
        isDivider: true
      },
      {
        icon: null,
        displayName: "Featured Help",
        isTitle: true
      },
      {
        icon: null,
        displayName: "Getting Started",
        active: false,
        location: "/learn"
      },
      {
        icon: null,
        displayName: "Installing Agents",
        active: false,
        location: "/learn"
      },
      {
        icon: null,
        displayName: "Video Tutorials",
        active: false,
        location: "/learn"
      }
    ]
  },
  {
    displayName: "Admin Tools",
    location: "/admin",
    active: false,
    admin: true,
    icon: <Icon
            size="default"
            type="objects"
            name="key"
            color="light" />,
    expanded: false,
    subNavItems: [
      {
        icon: null,
        displayName: "Summary",
        active: false,
        location: "#"
      },
      {
        isDivider: true
      },
      {
        icon: null,
        displayName: "License Management",
        isTitle: true
      },
      {
        icon: null,
        displayName: "All Licenses",
        active: false,
        location: "#"
      },
      {
        icon: null,
        displayName: "Configure Load Balancing",
        active: false,
        location: "#"
      },
      {
        icon: null,
        displayName: "Set License Rules",
        active: false,
        location: "#"
      },
      {
        icon: null,
        displayName: "Users and Groups",
        isTitle: true
      },
      {
        icon: null,
        displayName: "Business Units",
        active: false,
        location: "#"
      },
      {
        icon: null,
        displayName: "Groups",
        active: false,
        location: "#"
      },
      {
        icon: null,
        displayName: "Users",
        active: false,
        location: "/admin/users"
      },
      {
        icon: null,
        displayName: "API Clients",
        active: false,
        location: "#"
      },
      {
        icon: null,
        displayName: "Access Management",
        isTitle: true
      },
      {
        icon: null,
        displayName: "Authentication Provider",
        active: false,
        location: "#"
      },
      {
        icon: null,
        displayName: "Permissions",
        active: false,
        location: "#"
      },
      {
        icon: null,
        displayName: "Resources",
        isTitle: true
      },
      {
        icon: null,
        displayName: "Professional Services",
        active: false,
        location: "#"
      },
      {
        icon: null,
        displayName: "Support",
        active: false,
        location: "#"
      },
      {
        icon: null,
        displayName: "Learn",
        active: false,
        location: "#"
      },
      {
        icon: null,
        displayName: "Community",
        active: false,
        location: "#"
      }
    ]
  }
];


export class NavigationContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: NAV_ITEMS,
      showNotificationsPanel: false
    }
  }

  componentDidMount() {
    const path = window.location.pathname;
    const items = this.state.items;
    let primaryNavItem = items.find(i => i.location === path) || null;
    let secondaryNavItem = null;

    if (!primaryNavItem) {
      items.forEach(i => {
        if (!secondaryNavItem) {
          secondaryNavItem = i.subNavItems.find(sni => !sni.isTitle && !sni.isDivider && (sni.location === path));
          primaryNavItem = i;
        }
      })
    }

    primaryNavItem && this._onChangeLocation(primaryNavItem);
    secondaryNavItem && this._onChangeSecondaryLocation(primaryNavItem, secondaryNavItem);
  }

  _toggleNotificationsPanel() {
    this.setState(state => {
      return {
        showNotificationsPanel: state.showNotificationsPanel ? false : true
      }
    })
  }

  _onChangeLocation(item) {
    this.setState(state => {
      const items = state.items;

      items.forEach(i => {
        i.active = false;

        if (i.displayName === item.displayName) {
          i.active = true;
          if (i.subNavItems.length > 0) {
            i.subNavItems.forEach(si => {
              si.active = false;
            });

            i.subNavItems[0].active = true;
          }
        }
      })

      return { items: items }
    })
  }

  _onChangeSecondaryLocation(parent, item) {
    this.setState(state => {
      const items = this.state.items;

      items.forEach(i => {
        i.subNavItems.forEach(si => {
          si.active = false;

          if (si.displayName === item.displayName)
            si.active = true;
        })
      })

      return { items: items }
    })
  }

  render() {
    const { children } = this.props;
    const { items, showNotificationsPanel } = this.state;
    const activeItemName = items.find(i => i.active).displayName || null;

    document.title = activeItemName ? `AppDynamics - ${activeItemName}` : "AppDynamics";

    return (
      <NavigationContext.Provider 
        value={{
          items: items,
          showNotificationsPanel: showNotificationsPanel,
          onChangeLocation: (item) => { this._onChangeLocation(item) },
          onChangeSecondaryLocation: (parent, item) => { this._onChangeSecondaryLocation(parent, item) },
          toggleNotificationsPanel: this._toggleNotificationsPanel.bind(this)
        }}>
        { children }
      </NavigationContext.Provider>
    );
  }
}

export const NavigationContextConsumer = NavigationContext.Consumer;