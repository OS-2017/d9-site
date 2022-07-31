<?php

namespace Drupal\route_examples\Controller;

use \Drupal\Core\Controller\ControllerBase;
use \Drupal\user\UserInterface;
use \Drupal\node\NodeInterface;
use \Drupal\Core\Session\AccountInterface;
use \Drupal\Core\Access\AccessResult;

class RouteExampleController extends ControllerBase {

  public function helloWorld(){
    return [
      '#markup' => $this->t('Hello World!'),
    ];
  }

  public function helloUser(){
    $session = \Drupal::currentUser();
    return [
      '#markup' => $this->t('Hello @user', ['@user'=> $session->getDisplayName()]),
    ];
  }

  public function helloUserTitle(){
    $session = \Drupal::currentUser();
    return $this->t('Hello @user', ['@user'=> $session->getDisplayName()]);
  }

  //User info function
  public function userInfo(UserInterface $user) {
    //should be done with dependency injection
          $date_formater = \Drupal::service('date.formatter');
          //not use this layour markup in production - use theme system
          $markup = '<div>'.
            $this->t('Name: @name', ['@name' => $user->getDisplayName()]) .
            '</div>';
          $markup .= '<div>'.
            $this->t('Email: @email', ['@email' => $user->getEmail()]) .
            '</div>';
          $markup .= '<div>'.
            $this->t('Created: @created', ['@created' => $date_formater->format($user->getCreatedTime())]) .
            '</div>';
          $markup .= '<div>'.
            $this->t('Last Login: @login', ['@login' => $date_formater->format($user->getLastLoginTime())]) .
            '</div>';
      return [
        '#markup' => $markup,
      ];
      }
  public function userInfoTitle(UserInterface $user) {
    return $this->t('Information About @user', ['@user' => $user->getDisplayName()]);
  }
//to give extra custom permission to users
public function userInfoAccess(AccountInterface $account, UserInterface $user) {
  if ($account->hasPermission('view any user info')) {
    return AccessResult::allowed();
  }
  if ($account->hasPermission('view own user info') && $account->id() == $user->id()) {
    return AccessResult::allowed();
  }
  return AccessResult::forbidden();
}

  //to display list of node by $type and controlled number by %limit - 
  //parameters order doesn't matter!
  public function nodeList( $limit, $type) {
  //option without default type 'all'
  /*  $nids = \Drupal::entityQuery('node')
    ->condition('type', $type)
    ->range(0, $limit)
    ->execute();
    */

  //option with defaut type 'all'
    $query = \Drupal::entityQuery('node');
    if($type != 'all')
    $query->condition('type', $type);
  
    $nids = $query->range(0, $limit)
       ->execute();

  $nodes = \Drupal::entityTypeManager()->getStorage('node')->loadMultiple($nids);
    $header = [
      $this->t('ID'),
      $this->t('Type'),
      $this->t('Title'),
    ];
    $rows = [];
    foreach ($nodes as $node) {
      $rows[] = [
        $node->id(),
        $node->bundle(),
        $node->getTitle(),
      ];
    }
  //render results as a table  
    return [
      '#theme' => 'table',
      '#header' => $header,
      '#rows' => $rows,
      '#caption' => $this->t('These are some nodes.'),
    ];
  }
    
  //Node compare method
  public function nodeCompare(NodeInterface $node1, NodeInterface $node2) {
    $diff =$node1->getCreatedTime() - $node2->getCreatedTime();
    
    return [
      '#markup' => t('Created Time Difference: @diff seconds', ['@diff' => $diff]),
    ];
  }
  
}
