<?php

namespace Drupal\block_examples\Plugin\Block;
use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Hello' block.
 * 
 * @Block(
 *  id="block_examples_hello",
 *  admin_label = @Translation("Block Example: Hello"),
 *  category = @Translation("Examples")
 * )
 */

 class HelloBlock extends BlockBase {

//Protected block access - using session object
protected function blockAccess(\Drupal\Core\Session\AccountInterface $account){
  if ($account->isAnonymous()){
      return \Drupal\Core\Access\AccessResult::forbidden();
  }
  //find user site route is and if it's not user url/route forbid the access
  $route_name = \Drupal::routeMatch()->getRouteName();  

  // kint($route_name); // need to install dvel kint module
  //to find user route name to show block only on user profile pages
  if ( $route_name != 'entity.user.canonical'){
    return \Drupal\Core\Access\AccessResult::forbidden();
 }
//get parameters to find out the logged in user page looking at the user object
  $route_account = \Drupal::routeMatch()->getParameter('user');
// use kint to damp variables with kint send message - more stable to use
// click a bar to open just one level at the time
// ksm($route_name, $route_parameters);
 if (empty($route_account) || $route_account->id() != \Drupal::currentUser()->id()) {
  return \Drupal\Core\Access\AccessResult::forbidden();
 }

  return parent::blockAccess($account); //allow user access
}

  /**
  * {@inheritdoc}
  */

   public function build() {
    //load complete user object:
    $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
    //to get date formatter object - format time and handles time Zone issues
    //by default it's comes form drupal system as medium format, use 'short' for short format 07/13/2022 - 21:31
    $date_formatter = \Drupal::service('date.formatter');
    // using % instead of @ at placeholder makes it Italic

    return [
      '#markup' => $this->t('Hello %name !!! You logged in at @login', 
      [
      '%name' => $user->getDisplayName(),
      '@login' => $date_formatter->format($user->getLastLoginTime(), 'short'),
      ]
      ),
    ];

   }
 }