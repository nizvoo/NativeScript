﻿/**
 * Contains the Page class, which represents a logical unit for navigation inside a Frame. 
 */
declare module "ui/page" {
    import observable = require("data/observable");
    import contentView = require("ui/content-view");
    import frame = require("ui/frame");
    import color = require("color");
    import actionBar = require("ui/action-bar");
    import dependencyObservable = require("ui/core/dependency-observable");
    import keyframeAnimation = require("ui/animation/keyframe-animation");

    //@private
    import styleScope = require("ui/styling/style-scope");
    //@endprivate

    /**
     * Defines the data for the page navigation events.
     */
    export interface NavigatedData extends observable.EventData {
        /**
         * The navigation context (optional, may be undefined) passed to the page navigation events method.
         */
        context: any;

        /**
         * Represents if a navigation is forward or backward.
         */
        isBackNavigation: boolean;
    }

    /**
     * Defines the data for the Page.shownModally event.
     */
    export interface ShownModallyData extends observable.EventData {
        /**
         * The context (optional, may be undefined) passed to the page when shown modally.
         */
        context: any;

        /**
         * A callback to call when you want to close the modally shown page. Pass in any kind of arguments and you will receive when the callback parameter of Page.showModal is executed.
         */
        closeCallback: Function;
    }

    export module knownCollections {
        export var actionItems: string;
    }

    /**
     * Represents a logical unit for navigation (inside Frame).
     */
    export class Page extends contentView.ContentView {
        /**
         * Dependency property that specifies if page background should span under status bar.
         */
        public static backgroundSpanUnderStatusBarProperty: dependencyObservable.Property;

        /**
        * Dependency property that specifies the style of the status bar.
        */
        public static statusBarStyleProperty: dependencyObservable.Property;

        /**
        * Dependency property that specifies the background of the status bar in Android.
        */
        public static androidStatusBarBackgroundProperty: dependencyObservable.Property;

        /**
         * Dependency property used to hide the Navigation Bar in iOS and the Action Bar in Android.
         */
        public static actionBarHiddenProperty: dependencyObservable.Property;

        /**
         * Dependency property used to control if swipe back navigation in iOS is enabled.
         * This property is iOS sepecific. Default value: true
         */
        public static enableSwipeBackNavigationProperty: dependencyObservable.Property;

        /**
         * String value used when hooking to showingModally event.
         */
        public static showingModallyEvent: string;

        /**
         * String value used when hooking to shownModally event.
         */
        public static shownModallyEvent: string;

        /**
         * String value used when hooking to navigatingTo event.
         */
        public static navigatingToEvent: string;

        /**
         * String value used when hooking to navigatedTo event.
         */
        public static navigatedToEvent: string;

        /**
         * String value used when hooking to navigatingFrom event.
         */
        public static navigatingFromEvent: string;

        /**
         * String value used when hooking to navigatedFrom event.
         */
        public static navigatedFromEvent: string;

        /**
         * Gets or sets whether page background spans under status bar.
         */
        backgroundSpanUnderStatusBar: boolean;

        /**
         * Gets or sets the style of the status bar.
         */
        statusBarStyle: string;

        /**
         * Gets or sets the color of the status bar in Android.
         */
        androidStatusBarBackground: color.Color;

        /**
         * Used to hide the Navigation Bar in iOS and the Action Bar in Android.
         */
        actionBarHidden: boolean;

        /**
         * Used to control if swipe back navigation in iOS is enabled. This property is iOS sepecific. Default value: true
         */
        enableSwipeBackNavigation: boolean;

        /**
         * A valid css string which will be applied for all nested UI components (based on css rules).
         */
        css: string;

        /**
         * Adds a new values to current css.
         * @param cssString - A valid css which will be added to current css. 
         */
        addCss(cssString: string): void;

        /**
         * Adds the content of the file to the current css.
         * @param cssFileName - A valid file name (from the application root) which contains a valid css.
         */
        addCssFile(cssFileName: string): void;

        /**
         * Returns a CSS keyframe animation with the specified name, if it exists.
         */
        getKeyframeAnimationWithName(animationName: string): keyframeAnimation.KeyframeAnimationInfo;

        /**
         * A property that is used to pass a data from another page (while navigate to).
         */
        navigationContext: any;

        /**
         * Gets the Frame object controlling this instance.
         */
        frame: frame.Frame;

        /**
         * Gets the ActionBar for this page.
         */
        actionBar: actionBar.ActionBar;

        /**
         * A basic method signature to hook an event listener (shortcut alias to the addEventListener method).
         * @param eventNames - String corresponding to events (e.g. "propertyChange"). Optionally could be used more events separated by `,` (e.g. "propertyChange", "change"). 
         * @param callback - Callback function which will be executed when event is raised.
         * @param thisArg - An optional parameter which will be used as `this` context for callback execution.
         */
        on(eventNames: string, callback: (data: observable.EventData) => void, thisArg?: any): void;

        /**
         * Raised when navigation to the page has started.
         */
        on(event: "navigatingTo", callback: (args: NavigatedData) => void, thisArg?: any): void;

        /**
         * Raised when navigation to the page has finished.
         */
        on(event: "navigatedTo", callback: (args: NavigatedData) => void, thisArg?: any): void;

        /**
         * Raised when navigation from the page has started.
         */
        on(event: "navigatingFrom", callback: (args: NavigatedData) => void, thisArg?: any): void;

        /**
         * Raised when navigation from the page has finished.
         */
        on(event: "navigatedFrom", callback: (args: NavigatedData) => void, thisArg?: any): void;

        /**
         * Raised before the page is shown as a modal dialog.
         */
        on(event: "showingModally", callback: (args: ShownModallyData) => void, thisArg?: any): void;

        /**
         * Raised after the page is shown as a modal dialog.
         */
        on(event: "shownModally", callback: (args: ShownModallyData) => void, thisArg?: any);

        /**
         * Shows the page contained in moduleName as a modal view.
         * @param moduleName - The name of the page module to load starting from the application root.
         * @param context - Any context you want to pass to the modally shown page. This same context will be available in the arguments of the Page.shownModally event handler.
         * @param closeCallback - A function that will be called when the page is closed. Any arguments provided when calling ShownModallyData.closeCallback will be available here.
         * @param fullscreen - An optional parameter specifying whether to show the modal page in full-screen mode.
         */
        showModal(moduleName: string, context: any, closeCallback: Function, fullscreen?: boolean): Page;

        /**
         * Shows the page passed as parameter as a modal view.
         * @param page - Page instance to be shown modally.
         * @param context - Any context you want to pass to the modally shown page. This same context will be available in the arguments of the Page.shownModally event handler.
         * @param closeCallback - A function that will be called when the page is closed. Any arguments provided when calling ShownModallyData.closeCallback will be available here.
         * @param fullscreen - An optional parameter specifying whether to show the modal page in full-screen mode.
         */
        showModal(page: Page, context: any, closeCallback: Function, fullscreen?: boolean): Page;

        /**
         * Shows the page as a modal view.
         */
        showModal(): Page;

        /**
         * Closes the current modal view that this page is showing.
         */
        closeModal(): void;

        /**
         * Returns the current modal view that this page is showing (is parent of), if any.
         */
        modal: Page;

        //@private

        /**
         * identifier for the fragment that shows this page.
         * Android only. 
         */
        _fragmentTag: string;

        /**
         * A method called before navigating to the page.
         * @param context - The data passed to the page through the NavigationEntry.context property.
         * @param isBackNavigation - True if the Page is being navigated from using the Frame.goBack() method, false otherwise.
         * @param bindingContext - An object to become the binding context of the page navigating to. Optional.
         */
        onNavigatingTo(context: any, isBackNavigation: boolean, bindingContext?: any): void;

        /**
         * A method called after navigated to the page.
         * @param isBackNavigation - True if the Page is being navigated from using the Frame.goBack() method, false otherwise.
         */
        onNavigatedTo(isBackNavigation: boolean): void;

        /**
         * A method called before navigating from the page.
         * @param isBackNavigation - True if the Page is being navigated from using the Frame.goBack() method, false otherwise.
         */
        onNavigatingFrom(isBackNavigation: boolean): void;

        /**
         * A method called after navigated from the page.
         * @param isBackNavigation - True if the Page is being navigated from using the Frame.goBack() method, false otherwise.
         */
        onNavigatedFrom(isBackNavigation: boolean): void;

        _getStyleScope(): styleScope.StyleScope;
        //@endprivate
    }
}