<?php

namespace Drupal\route_examples\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;
/**
 * Listens to the dynamic route events.
 */

class ExampleRouteSubscriber extends RouteSubscriberBase {

  public function alterRoutes(RouteCollection $collection) {
    // Change path '/user/logout' to '/logout'.
    if ($route = $collection->get('user.logout')) {
      $route->setPath('/logout');
    }
    // make changes in default route section passing a key as first param and value as second
    if ($route = $collection->get('system.admin_structure')) {
      $route->setDefault('_title', 'Architecture');
     // $route->setRequirement('_permission', 'perm_machine_name');
    }
  }

}

  
